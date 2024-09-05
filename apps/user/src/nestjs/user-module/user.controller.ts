import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  UserCreateDto,
  UseService,
} from '../../core/application/service/user.service';
import { UserPresenter } from './user.presenter';
import { SkipThrottle } from '@nestjs/throttler';
import { Role, Roles } from '@app/shared/nestjs/decorator';
import { Public } from '@app/shared/nestjs/decorator';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@SkipThrottle()
@Controller('user')
export class UserController {
  private clientProxy: ClientProxy;
  // constructor(private userService: UseService) {}

  // @Inject(queueOptions.adminBackendQueue.name)
  //   private readonly adminBackendProxy: ClientProxy,

  constructor(private userService: UseService) {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@rabbitmq:5672'],
        queue: 'admin-backend',
        //   noAck: true,
        //   queueOptions: {
        //     durable: true,
        //     deadLetterExchange: 'my_dlq',
        //     deadLetterRoutingKey: 'my_dlq_key',
        //     messageTtl: 5000,
        //     maxLength: 2,
        //   },
      },
    });
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SkipThrottle({ default: false })
  async create(@Body() dto: UserCreateDto) {
    const access_token = await this.userService.create(dto);
    this.clientProxy.emit('criar-categoria', {
      message: 'ok',
    });

    return {
      access_token,
    };
  }

  @Get()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const users = await this.userService.findAll();
    return UserPresenter.toJsonArray(users);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async findBy(@Query() query: { password: string; username: string }) {
    const user = await this.userService.findOne(query.password, query.username);
    return UserPresenter.toJson(user);
  }

  @Get('profile')
  @Roles(Role.Admin)
  profile(@Request() req) {
    return req.user;
  }

  // @EventPattern('criar-categoria')
  // async handle(@Payload() data: { message: string }) {
  //   console.log(data);
  // }
}
