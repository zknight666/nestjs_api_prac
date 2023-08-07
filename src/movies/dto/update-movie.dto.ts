import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  @IsString() // title이 string 아니면 데이터 안받음
  readonly title?: string;

  @IsNumber() // year이 number가 아니면 데이터 안받음
  readonly year?: number;

  @IsString({ each: true }) // genres의 각 value 값이 string이 아니면 데이터 안 받음
  readonly genres?: string[];
}
