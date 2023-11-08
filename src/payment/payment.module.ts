import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { User } from 'src/login/user.model';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.model';


@Module({
  imports: [TypegooseModule.forFeature([Payment,User])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}