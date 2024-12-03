import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Skip logging for GET requests
    if (request.method === 'GET') {
      return next.handle();
    }

    const user = request.session['user'];

    return next.handle().pipe(
      tap(async (data) => {
        const action = this.mapMethodToAction(request.method, request.url);
        const entity = this.determineEntity(request.url);

        try {
          await this.prisma.activityLogs.create({
            data: {
              userId: user.id,
              action,
              affected_entity: entity,
              affected_id: data?.id || null, // Assumes the operation returns an ID
            },
          });
        } catch (error) {
          console.log('error', error);
        }
      }),
    );
  }

  private mapMethodToAction(method: string, path: string) {
    if (path.includes('/suspend')) return 'SUSPEND';
    if (path.includes('/activate')) return 'ACTIVATE';

    switch (method) {
      case 'POST':
        return 'CREATE';
      case 'PUT':
      case 'PATCH':
        return 'UPDATE';
      case 'DELETE':
        return 'DELETE';
      default:
        return 'UPDATE';
    }
  }

  private determineEntity(url: string) {
    if (url.includes('user')) return 'USER';
    if (url.includes('resume')) return 'RESUME';
  }
}
