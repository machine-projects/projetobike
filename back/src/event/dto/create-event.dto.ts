import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  title: string;
  
  @IsOptional()
  description: string;
  
  @IsOptional()
  photos: Array<any>;

  @IsNotEmpty()
  isFeatured: Boolean;

  @IsDate()
  startDate: Date;
  @IsDate()
  stopDate: Date;
}
