import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe, PipeTransform } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../tasks/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Param } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Query } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }
  
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    
    return this.tasksService.getTasks(filterDto);
    
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe  ) id: number) : Promise<Task>
  {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto:CreateTaskDto  
  ) : Promise<Task>
  {
    return this.tasksService.createTask(createTaskDto);  
  }

  @Delete('/:id')
  deleteTask(@Param('id',ParseIntPipe) id: number): Promise<void>
  {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateStatusById(
    @Param('id',ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status:TaskStatus) : Promise<Task>
  {
    return this.tasksService.updateTaskStatus(id,status); 

  }
}