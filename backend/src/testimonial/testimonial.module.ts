import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialAdminController } from './controller/testimonial-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Testimonial } from './entities/testimonial.entity';
import { TestimonialController } from './controller/testimonial.controller';

@Module({
  controllers: [TestimonialAdminController, TestimonialController],
  providers: [TestimonialService],
  imports: [TypeOrmModule.forFeature([User, Testimonial])],
})
export class TestimonialModule {}
