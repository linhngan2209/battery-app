import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Jaeger = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.jaeger;
  },
);
