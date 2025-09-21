//npm install inversify
//Использовать декоратор @injectable для указания классов, которые можно помещать в контейнер
//Использовать декоратор @inject для внедрения зависимостей по определенному символу
//Для корректной работы декораторов и зависимостей необходимо использовать Reflect-metadata

export const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),
  UsersRepository: Symbol.for('UsersRepository'),
};
