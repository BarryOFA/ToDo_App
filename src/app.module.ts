import { MongooseModule } from '@nestjs/mongoose'
import { TodoModule } from './todo/todo.module'
import * as dotenv from 'dotenv'
import { MiddlewareConsumer, RequestMethod, Module } from '@nestjs/common'
import { TraceMiddleware } from 'src/todo/middlewere/trace.middleware'
import { LoggerMiddleware } from 'src/todo/middlewere/logger.middleware'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from 'src/interceptors/response.interceptor'

dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI), TodoModule],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
