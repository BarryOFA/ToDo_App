import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator'

import { TodoStatus } from '../schemas/todo.schemas'

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus
}
