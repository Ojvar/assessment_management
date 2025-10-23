import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentModule } from './assessment/assessment.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { UsersModule } from './users/user.module';
import { UsersService } from './users/user.service';

@Module({
  imports: [AssessmentModule, AuthModule, UsersModule],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule { }
