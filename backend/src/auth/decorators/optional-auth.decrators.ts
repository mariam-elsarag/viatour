import { SetMetadata } from '@nestjs/common';

export const IS_TOKEN_REQUIRED_KEY = 'isTokenRequired';
export const OptionalAuth = () => SetMetadata(IS_TOKEN_REQUIRED_KEY, false);
