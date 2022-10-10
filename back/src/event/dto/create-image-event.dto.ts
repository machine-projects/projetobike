import { IsOptional } from "class-validator";

export class CreateImageEventDto {
  
  @IsOptional()
  photos: Array<Express.Multer.File> 

  @IsOptional()
  imageHeader: Express.Multer.File 

}
