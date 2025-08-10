import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { Repository } from 'typeorm';
import { userType } from 'src/utils/types';
import { userRole } from 'src/utils/enum';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Request } from 'express';
import { NotFoundError } from 'rxjs';
import { FullPaginationDto } from 'src/common/pagination/dto/pagination.dto';
import { FilterUserListDto } from 'src/users/dto/user-query.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private readonly supportRepository: Repository<Support>,
  ) {}
  // create new support for all type of users
  async create(body: CreateSupportDto, payload: userType | null) {
    const data = {
      ...body,
      role: userRole.Visitor,
      email: body.email ? body.email.toLowerCase() : payload?.email,
      fullName: body.fullName ? body.fullName : payload?.fullName,
    };

    if (payload) {
      data.role = payload.role;
    } else {
      if (!body.fullName) {
        throw new BadRequestException({
          message: 'Full name is required',
          error: { fullName: 'Full name is required' },
        });
      }
      if (!body.email) {
        throw new BadRequestException({
          message: 'Email is required',
          error: { email: 'Email is required' },
        });
      }
    }

    const save = await this.supportRepository.save(data);
    return {
      id: save.id,
      fullName: save.fullName,
      email: save.email,
      message: save.message,
      createdAt: save.createdAt,
    };
  }

  async findOne(id: number) {
    const support = await this.supportRepository.findOneBy({ id });
    if (!support) {
      throw new NotFoundError('Support  not found');
    }
    return support;
  }

  async findAll(query: FilterUserListDto, req: Request) {
    const { search, page = '1', limit = '10', role } = query ?? {};
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;

    const qb = this.supportRepository.createQueryBuilder('support');
    if (role) {
      qb.andWhere('role = :role', { role });
    }
    if (search) {
      qb.andWhere('(user.fullName ILIKE :search OR user.email ILIKE :search)', {
        search: `%${search}%`,
      });
    }
    const [results, count] = await qb
      .orderBy('support.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return new FullPaginationDto(currentPage, count, take, req, results);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.supportRepository.delete({ id });
    return `This action removes a #${id} support`;
  }
}
