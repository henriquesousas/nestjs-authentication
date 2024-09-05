import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.connectMicroservice(queueOptions.adminBackendQueue);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://admin:admin@rabbitmq:5672'],
  //     queue: 'admin-backend',
  //     // queueOptions: {
  //     //   deadLetterExchange: 'my_dlq',
  //     //   deadLetterRoutingKey: 'my_dlq_key',
  //     //   messageTtl: 5000,
  //     // },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
