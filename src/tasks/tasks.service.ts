import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { stat } from 'fs';
import { STATUS_CODES } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository:TaskRepository

  ) { }
  
  async getTaskById(id: number) : Promise<Task>
  {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;

  }

  async createTask(createTaktDto: CreateTaskDto): Promise<Task>
  {
    return this.taskRepository.createTask(createTaktDto);
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0)
    {
      throw new NotFoundException(`Task with ID ${id} not found`);
      }
        
  }

  async updateTaskStatus(id: number, status: TaskStatus) :Promise<Task>{
    const task = await this.getTaskById(id);

    task.status = status;

    await task.save();
    return task;
    
    
  }

  async getTasks(filterDto: GetTasksFilterDto):Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
    
  }


//   getAllTasks() : Task[]
// {''
//     return this.tasks;
//   }

//   getTaskById(id: string): Task
//   {
//     const found = this.tasks.find(task => task.id === id);

//     if (!found) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     return found;
//   }

//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {

//     const { status, search } = filterDto;

//     let tasks = this.getAllTasks();
    
//     if (status) {
//       tasks = tasks.filter(task=>task.status===status)
//     }

//     if (search) {
//       tasks = tasks.filter( task =>
//         task.title.includes(search) || task.description.includes(search),
//       )
//     }


//     return tasks;
//   }





} 
