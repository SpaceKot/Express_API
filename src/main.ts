import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((options) => {
    options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    options.bind<IUserController>(TYPES.UserController).to(UserController);
    options.bind<IUserService>(TYPES.UserService).to(UserService);
    options.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    options.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    options.bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { appContainer, app };
}

export const boot = bootstrap();

