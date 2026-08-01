import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { GigsModule } from './src/gigs/gigs.module';
import { OrdersModule } from './src/orders/orders.module';
import { MessagesModule } from './src/messages/messages.module';
import { PaymentsModule } from './src/payments/payments.module';
import { NotificationsModule } from './src/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'freelance_hub',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    GigsModule,
    OrdersModule,
    MessagesModule,
    PaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}