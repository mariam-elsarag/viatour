import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TestimonialService } from '../testimonial.service';
import { currentUser, Roles } from 'src/auth/decorators/auth.decrators';
import { userRole } from 'src/utils/enum';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { userType } from 'src/utils/types';

@Controller('/api/testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}
  // will change later only user who make booking can make testimnail and admin can add new one

  @Post()
  @Roles(userRole.ADMIN, userRole.User)
  @AcceptFormData()
  @UseGuards(AuthGuard)
  create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @currentUser() user: userType,
  ) {
    return this.testimonialService.create(createTestimonialDto, user);
  }

  // random testimonials for landing
  @Get()
  randomTestimonials() {
    return this.testimonialService.radnomtestimonial();
  }
}
