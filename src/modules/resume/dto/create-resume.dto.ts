import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateResumeDto {
  @IsOptional()
  userId: string;

  @IsString()
  name: string;
  @IsString()
  address: string;

  @IsEmail()
  email: string;
  @IsString()
  phone: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Education)
  educations?: Education[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Experience)
  experiences?: Experience[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Project)
  projects?: Project[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  skills?: Skill[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Reference)
  references?: Reference[];
}

export class Education {
  @IsOptional()
  id: number;
  @IsString()
  school: string;
  @IsString()
  degree: string;
  @IsString()
  field_of_study: string;
  @IsInt()
  start_year: number;
  @IsOptional()
  @IsInt()
  end_year: number;
}

class Experience {
  @IsOptional()
  id: number;
  @IsString()
  company: string;
  @IsString()
  position: string;
  @IsString()
  description: string;
  @IsInt()
  start_year: number;
  @IsOptional()
  @IsInt()
  end_year: number;
}

class Project {
  @IsOptional()
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
}

class Skill {
  @IsOptional()
  id: number;
  @IsString()
  name: string;
  @IsInt()
  level: number;
}

class Reference {
  @IsOptional()
  id: number;
  @IsString()
  company: string;
}
