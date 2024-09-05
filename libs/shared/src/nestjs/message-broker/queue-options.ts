// import {
//   ClientProviderOptions,
//   RmqOptions,
//   Transport,
// } from '@nestjs/microservices';

// const userQueueName = 'user';
// const userQueueRecoveryName = 'user-recovery';

// // setup the RabbitMQ connection
// const rmqOptions: RmqOptions = {
//   transport: Transport.RMQ,
//   options: {
//     urls: ['amqp://admin:admin@rabbitmq:5672'],
//   },
// };

// const userQueue: ClientProviderOptions = {
//   ...rmqOptions,
//   // injection token for our RabbitMQ client
//   name: userQueueName,
//   options: {
//     ...rmqOptions.options,
//     // actual RabbitMQ queue name
//     queue: userQueueName,
//     // require explicit acknowledgement of messages
//     noAck: false,
//     queueOptions: {
//       // setup the dead letter exchange to point to the default exchange
//       deadLetterExchange: '',
//       // dead letters from our burger-queue should be routed to the recovery-queue
//       deadLetterRoutingKey: userQueueRecoveryName,
//       // set message time to live to 4s
//       messageTtl: 10000,
//     },
//   },
// };

// const userQueueRecovery: ClientProviderOptions = {
//   ...rmqOptions,
//   name: userQueueRecoveryName,
//   options: {
//     ...rmqOptions.options,
//     queue: userQueueRecoveryName,
//     noAck: false,
//   },
// };

// export const queueOptions = {
//   userQueue,
//   userQueueRecovery,
// };
