import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';

@Service()
export class RegisterService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    private authService: AuthService,
  ) {
    //
  }

  public async register(data: object) {
    let user = await this.userRepository.createUser(data);

    user = await this.userRepository.findOne({
      where: { user_id: user.user_id },
      relations: ['role'],
    });

    this.eventDispatcher.dispatch('onUserRegister', user);

    return this.authService.sign(
      {
        userId: user.user_id,
        email: user.email,
        role_id: user.role_id,
        role: user.role.name,
      },
      { user: { user_id: user.user_id, email: user.email, role: user.role.name } },
    );
  }
}
