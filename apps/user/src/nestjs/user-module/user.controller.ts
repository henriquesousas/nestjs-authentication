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
import { ClientProxy } from '@nestjs/microservices';
import { MyRabbitMQService } from './rabbitmq-service';

@SkipThrottle()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UseService,
    private readonly rabbitMQService: MyRabbitMQService,
    @Inject('CATS_SERVICE') private client2: ClientProxy,
    @Inject('CATS_SERVICE2') private client3: ClientProxy,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SkipThrottle({ default: false })
  async create(@Body() dto: UserCreateDto) {
    const access_token = await this.userService.create(dto);

    this.rabbitMQService.emit('criar-user', 'OK');

    this.client2.emit('criar-categoria', {
      message: 'ok',
    });

    this.client3.emit('criar-categoria', {
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
}
