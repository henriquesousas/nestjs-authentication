import { JwtService as JwtServiceNestJs } from '@nestjs/jwt';
import { JwtService } from '../../core/infrastructure/crytography/jwt.service';

import { UseService } from '../../core/application/service/user.service';
import { UseRepository } from '../../core/domain/repository/use.respository';
import { Cryptography } from '../../core/application/cryptography/cryptography';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from '../@shared-module/guard/user.guard';
import { RolesGuard } from '../@shared-module/guard/roles.guard';
import { BCryptService } from '../../core/infrastructure/crytography/bcrypt.service';
import { Hash } from '../../core/application/cryptography/hash';
import { UseRepositoryLocal } from '../../core/infrastructure/repository/local/user.repository-local';

const CRYPTOGRAPHY = {
  JWT_SERVICE: {
    provide: JwtService,
    useFactory: (jwtServiceNestJs: JwtServiceNestJs) => {
      return new JwtService(jwtServiceNestJs);
    },
    inject: [JwtServiceNestJs],
  },

  BCRYPT_HASH_SERVICE: {
    provide: BCryptService,
    useFactory() {
      return new BCryptService(12);
    },
  },
};

const REPOSITORY = {
  USER_REPOSITORY_LOCAL: {
    provide: UseRepositoryLocal,
    useFactory() {
      return new UseRepositoryLocal();
    },
  },
};

const SERVICE = {
  USER_SERVICE: {
    provide: UseService,
    useFactory: (
      repository: UseRepository,
      cryptography: Cryptography,
      hash: Hash,
    ) => {
      return new UseService(repository, cryptography, hash);
    },
    inject: [UseRepositoryLocal, JwtService, BCryptService],
  },
};

const GUARD = {
  USER_GUARD: {
    provide: APP_GUARD,
    useClass: UserGuard,
  },
  ROLE_GUARD: {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
};

export const USER_PROVIDE = {
  CRYPTOGRAPHY,
  REPOSITORY,
  SERVICE,
  GUARD,
};
