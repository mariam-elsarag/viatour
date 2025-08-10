import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SupportService } from '../support.service';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/auth.decrators';

import { userRole } from 'src/utils/enum';
import { Request } from 'express';
import { FilterUserListDto } from 'src/users/dto/user-query.dto';

@Roles(userRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('/api/admin/support')
export class SupportAdminController {
  constructor(private readonly supportService: SupportService) {}

  @Get()
  findAll(@Query() query: FilterUserListDto, @Req() req: Request) {
    return this.supportService.findAll(query, req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supportService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supportService.remove(+id);
  }
}
