import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { PaymentsModule } from "./payments/payments.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "payment_dashboard",
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== "production",
    }),
    AuthModule,
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
