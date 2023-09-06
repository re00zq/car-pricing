import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(id: number): Promise<User | null> {
    const user: User = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`the user with ${id} id is not found`);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  create(data: { email: string; password: string }): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    const user: User = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`the user with ${id} id is not found`);
    return this.userRepo.update(user, data);
  }

  async delete(id: number) {
    const user: User = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new NotFoundException(
        `the user with ${id} id is is already deleted`,
      );
    return this.userRepo.delete(id);
  }
}
