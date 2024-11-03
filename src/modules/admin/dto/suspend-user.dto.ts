import { IsUUID } from 'class-validator';

export class IDUserDto {
  @IsUUID('4', { message: 'Invalid ID format' })
  id: string;
}
