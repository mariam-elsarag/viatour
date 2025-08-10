import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { FullPaginationDto } from 'src/common/pagination/dto/pagination.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>,
  ) {}
  async create(body: CreateFaqDto) {
    await this.faqRepository.save(body);
    return body;
  }

  async findAllLanding() {
    const faqs = await this.faqRepository.find();
    return faqs ?? [];
  }
  async findAllAdmin(query: PaginationQueryDto, req: Request) {
    const { search, page = '1', limit = '10' } = query ?? {};
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;

    const qb = this.faqRepository.createQueryBuilder('faq');
    if (search) {
      qb.andWhere('(question ILIKE :search )', {
        search: `%${search}%`,
      });
    }
    const [results, count] = await qb
      .orderBy('faq.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return new FullPaginationDto(currentPage, count, take, req, results);
  }

  async findOne(id: number) {
    const faq = await this.faqRepository.findOneBy({ id });
    if (!faq) {
      throw new NotFoundError('Faq not found');
    }
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.findOne(id);
    Object.assign(
      faq,
      Object.fromEntries(
        Object.entries(updateFaqDto).filter(([_, v]) => v !== undefined),
      ),
    );
    if (updateFaqDto.answer || updateFaqDto.question) {
      await this.faqRepository.save(faq);
    }
    return faq;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.faqRepository.delete({ id });
    return `This action removes a #${id} faq`;
  }
}
