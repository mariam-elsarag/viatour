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
import { FaqService } from '../faq.service';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { Roles } from 'src/auth/decorators/auth.decrators';
import { userRole } from 'src/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Roles(userRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('/api/admin/faq')
export class FaqAdminController {
  constructor(private readonly faqService: FaqService) {}

  // Admin endpoint
  @Post()
  @AcceptFormData()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get('/list')
  findAllForAdmin(@Req() req: Request, @Query() query: PaginationQueryDto) {
    return this.faqService.findAllAdmin(query, req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @AcceptFormData()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.remove(id);
  }
}
