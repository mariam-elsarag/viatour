import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqAdminController } from './controllers/faq-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { User } from 'src/users/entities/user.entity';
import { FaqPublicController } from './controllers/faq-public.controller';

@Module({
  controllers: [FaqAdminController, FaqPublicController],
  providers: [FaqService],
  imports: [TypeOrmModule.forFeature([Faq, User])],
})
export class FaqModule {}
