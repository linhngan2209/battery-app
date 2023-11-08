import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { pick } from 'lodash';

export interface TenantContext {
  key?: string;
  fromid?: string;
  endpoint?: string;
  partner?: string;
}

export interface TokenContext {
  authorization: string;
}

export const TenantContext = createParamDecorator<any, any, TenantContext>(
  (data: string, ctx: ExecutionContext): TenantContext => {
    const req = ctx.switchToHttp().getRequest();
    return pick(req.query, ['key', 'fromid', 'endpoint', 'partner']);
  },
);

export const TokenContext = createParamDecorator<any, any, TokenContext>(
  (data: string, ctx: ExecutionContext): TokenContext => {
    const req = ctx.switchToHttp().getRequest();
    return pick(req.headers, ['authorization']);
  },
);
