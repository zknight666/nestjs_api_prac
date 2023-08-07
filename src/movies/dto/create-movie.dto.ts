import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDTO {
  @IsString() // title이 string 아니면 데이터 안받음
  readonly title: string;

  @IsNumber() // year이 number가 아니면 데이터 안받음
  readonly year: number;

  @IsOptional() // genres가 아예 없어도 데이터 받을 수 있음
  @IsString({ each: true }) // genres의 각 value 값이 string이 아니면 데이터 안 받음
  readonly genres: string[];
}
