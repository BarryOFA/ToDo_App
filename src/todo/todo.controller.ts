import { Controller } from '@nestjs/common'

import { TodoService } from './todo.service'
// import { CreateTodoDto } from './dtos/create-todo.dto'
// import { UpdateTodoDto } from './dtos/update-todo.dto'
import { MessagePattern } from '@nestjs/microservices'

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @MessagePattern('get-todo')
  getTodos(data: any) {
    console.log(data)
    return {
      status: true,
      message: `DESDE TODO. SEGUNDOS: ${new Date().getSeconds()}`,
    }
  }

  // @Post()
  // async create(@Body(new ValidationPipe()) createTodo: CreateTodoDto) {
  //   return this.todoService.create(createTodo);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body(new ValidationPipe()) updateTodo: UpdateTodoDto,
  // ) {
  //   return this.todoService.update(id, updateTodo);
  // }

  // @Get()
  // async findAll() {
  //   return this.todoService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(id);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.todoService.delete(id);
  // }
}
