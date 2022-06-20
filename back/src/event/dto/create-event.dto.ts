import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
  
  @IsNotEmpty()
  title: string;
  
  @IsOptional()
  description: string;
  
  @IsOptional()
  photos: Array<Express.Multer.File> 

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  imageHeader: Express.Multer.File 

  @IsNotEmpty()
  @Type(() => Boolean)
  isFeatured: Boolean;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  stopDate: Date;
}
