import { IsNotEmpty, IsOptional } from "class-validator";

export class DeleteEventImageDto {
  
  @IsOptional()
  gallery: [{filename: string}]
  @IsOptional()
  header: {filename: string}

}
