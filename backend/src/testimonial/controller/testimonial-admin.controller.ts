import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { TestimonialService } from '../testimonial.service';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';
import { currentUser, Roles } from 'src/auth/decorators/auth.decrators';
import { userRole } from 'src/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';

import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Roles(userRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('/api/admin/testimonial')
export class TestimonialAdminController {
  constructor(private readonly testimonialService: TestimonialService) {}

  // list for admin
  @Get('list')
  adminList(@Query() query: PaginationQueryDto, @Req() req: Request) {
    return this.testimonialService.adminList(query, req);
  }

  @Get(':id')
  @Roles(userRole.ADMIN)
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.findOne(id);
  }

  @Patch(':id')
  @AcceptFormData()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTestimonialDto,
  ) {
    return this.testimonialService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.remove(id);
  }
}
