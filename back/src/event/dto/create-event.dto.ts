import { IsDate, IsNotEmpty } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsDate()
  startDate: Date;
  @IsDate()
  stopDate: Date;
}
