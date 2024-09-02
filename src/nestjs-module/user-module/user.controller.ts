import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
    const users = await this.userService.getAll();
    return UserPresenter.toJsonArray(users);
  }

  @Get('profile')
  @Roles(Role.Admin)
  me(@Request() req) {
    return req.user;
  }

  // @Roles(Role.Admin)
  // @HttpCode(HttpStatus.OK)
  // @Get('login')
  // findBy(@Body() signInDto: Record<string, any>) {
  //   return this.authService.create(signInDto.username, signInDto.password);
  // }
}
