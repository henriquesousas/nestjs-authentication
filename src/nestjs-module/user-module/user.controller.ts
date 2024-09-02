import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  UserCreateDto,
  UseService,
} from '../../core/application/service/user.service';
import { Public } from '../@shared-module/decorator/public.decorator';
import { UserPresenter } from './user.presenter';
import { Role, Roles } from '../@shared-module/decorator/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UseService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: UserCreateDto) {
    const access_token = await this.userService.create(dto);
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
