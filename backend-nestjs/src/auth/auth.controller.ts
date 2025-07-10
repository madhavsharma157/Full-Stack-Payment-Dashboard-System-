import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import type { AuthService } from "./auth.service"
import type { LoginDto } from "./dto/login.dto"

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
