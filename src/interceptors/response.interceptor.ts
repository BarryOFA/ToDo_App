import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { SuccessResponse } from 'src/todo/interfaces/success-response.interface'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const traceValue = request.headers.trace

    return next.handle().pipe(
      map((data: any) => {
        return {
          trace: traceValue,
          code: response.statusCode,
          message: 'successfull',
          data: data?.items ? data.items : data?.data ? data.data : data,
          pagination: data?.meta
            ? data.meta
            : data?.pagination
              ? data.pagination
              : undefined,
        }
      }),
    )
  }
}
