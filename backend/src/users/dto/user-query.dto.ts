import { IsEnum, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { userRole } from 'src/utils/enum';

export class FilterUserListDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(userRole)
  role?: userRole;
}
