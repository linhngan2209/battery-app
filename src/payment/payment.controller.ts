import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";


@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService ) {}

    @Post()
    async controlDevice (@Body('phoneNumber') phone: string) {
        return this.paymentService.payment(phone)
    }
   
}