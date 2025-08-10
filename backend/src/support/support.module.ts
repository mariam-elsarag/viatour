import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportAdminController } from './controller/support-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { User } from 'src/users/entities/user.entity';
import { SupportPublicController } from './controller/support-public.controller';

@Module({
  controllers: [SupportAdminController, SupportPublicController],
  providers: [SupportService],
  imports: [TypeOrmModule.forFeature([Support, User])],
})
export class SupportModule {}
