import { IsString, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({ example: "admin" })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: "admin123" })
  @IsString()
  @IsNotEmpty()
  password: string
}
