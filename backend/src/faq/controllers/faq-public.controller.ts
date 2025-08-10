import { Controller, Get } from '@nestjs/common';
import { FaqService } from '../faq.service';

@Controller('/api/faq')
export class FaqPublicController {
  constructor(private readonly faqService: FaqService) {}
  @Get()
  findAll() {
    return this.faqService.findAllLanding();
  }
}
