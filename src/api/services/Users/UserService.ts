import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { UserNotFoundException } from '@api/exceptions/Users/UserNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: UserRepository, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

   public async getUsers(search: string) {
    const isSearchEmpty = !search || search.trim() === "";

    const queryBuilder = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.role', 'role');

    if(!isSearchEmpty) {
      const searchFields = ['first_name', 'last_name', 'email'];

      const orConditions = searchFields.map(field => `${field} LIKE :search`);
    
      const whereClause = `${orConditions.join(" OR ")}`;
      const searchValue = `%${search}%`;

      queryBuilder.andWhere(whereClause, {search: searchValue});
    }

    queryBuilder.select(['user.user_id', 'user.first_name', 'user.last_name', 'user.email', 'role.name']);

    const users = await queryBuilder.getMany();

    if(!users) {
      throw new UserNotFoundException();
    }

    return users;
  }


  public async getAll(resourceOptions?: object) {
    return await this.userRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(user_id: number, resourceOptions?: object) {
    return await this.getRequestedUserOrFail(user_id, resourceOptions);
  }

  public async create(data: object) {
    let user = await this.userRepository.createUser(data);

    this.eventDispatcher.dispatch('onUserCreate', user);

    return user;
  }

  public async updateOneById(user_id: number, data: object) {
    const user = await this.getRequestedUserOrFail(user_id);

    return await this.userRepository.updateUser(user, data);
  }

  public async deleteOneById(user_id: number) {
    return await this.userRepository.delete(user_id);
  }

  private async getRequestedUserOrFail(user_id: number, resourceOptions?: object) {
    let user = await this.userRepository.getOneById(user_id, resourceOptions);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
