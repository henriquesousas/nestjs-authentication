import { JwtService } from '@nestjs/jwt';
import { JwtCryptographyService } from '../../core/infrastructure/crytography/jwt-cryptography.service';
import { UseRepositoryLocal } from '../../core/infrastructure/db/local/user.repository-local';
import { UseService } from '../../core/application/service/user.service';
import { UseRepository } from '../../core/domain/repository/use.respository';
import { Cryptography } from '../../core/application/cryptography/cryptography';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from '../@shared-module/guard/user.guard';
import { RolesGuard } from '../@shared-module/guard/roles.guard';
import { BCryptHashService } from '../../core/infrastructure/crytography/bcrypt-hash.service';
import { Hash } from '../../core/application/cryptography/hash';

const CRYPTOGRAPHY = {
  JWT_SERVICE: {
    provide: JwtCryptographyService,
    useFactory: (jwtService: JwtService) => {
      return new JwtCryptographyService(jwtService);
    },
    inject: [JwtService],
  },

  BCRYPT_HASH_SERVICE: {
    provide: BCryptHashService,
    useFactory() {
      return new BCryptHashService(12);
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
    inject: [UseRepositoryLocal, JwtCryptographyService, BCryptHashService],
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
