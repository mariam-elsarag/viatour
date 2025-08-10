import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SupportService } from '../support.service';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';
import { OptionalAuth } from 'src/auth/decorators/optional-auth.decrators';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateSupportDto } from '../dto/create-support.dto';
import { userType } from 'src/utils/types';
import { currentUser, Roles } from 'src/auth/decorators/auth.decrators';
import { userRole } from 'src/utils/enum';

@Controller('/api/support')
export class SupportPublicController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @AcceptFormData()
  @OptionalAuth()
  @Roles(userRole.Agent, userRole.User)
  @UseGuards(AuthGuard)
  create(
    @Body() createSupportDto: CreateSupportDto,
    @currentUser() user: userType,
  ) {
    return this.supportService.create(createSupportDto, user);
  }
}
