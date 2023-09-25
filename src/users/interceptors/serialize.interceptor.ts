import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // every code you write here(before handle() method) will be executed before the route handler.
    // and every code you write in pipe method (after calling the handle() method) will be executed after the route handler.
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
