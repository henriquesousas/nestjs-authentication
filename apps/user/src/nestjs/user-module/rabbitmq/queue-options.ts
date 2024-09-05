import {
  ClientProviderOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

const rmqOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://admin:admin@rabbitmq:5672'],
  },
};

export const queueOptions = (
  nameProvider: string,
  queue: string,
): ClientProviderOptions => {
  return {
    ...rmqOptions,
    name: nameProvider,
    options: {
      ...rmqOptions.options,
      queue,
    },
  };
};
