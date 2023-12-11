import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { AxiosError } from 'axios'
import { isEmpty } from 'class-validator'
import { ExceptionResponse } from 'src/todo/interfaces/exception-response.interface'

@Catch()
export class ExceptionFilter implements ExceptionResponse {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  error: any
  trace: string
  code: number
  message: string
  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const request = ctx.getRequest()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    this.trace = request.header('trace')
    this.code = httpStatus

    if (exception instanceof HttpException) {
      this.error = exception.message
    } else if (exception instanceof AxiosError) {
      this.message = exception.name
      this.error = !isEmpty(exception.message)
        ? exception.message
        : exception.code
    } else if (exception instanceof Error) {
      this.message = exception.message
      this.error = exception.stack
    } else {
      this.message = exception.name
      this.error = exception.message
    }

    const responseBody: ExceptionResponse = {
      code: this.code,
      trace: this.trace,
      message: this.message,
      error: this.error,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
