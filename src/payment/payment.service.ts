import {Injectable, Res, BadRequestException, Logger} from '@nestjs/common'
import {InjectModel} from '@m8a/nestjs-typegoose';
import {Model, Number} from 'mongoose';
import {Payment} from 'src/payment/payment.model';
import {User} from 'src/login/user.model';


@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment)private readonly paymentModel : Model < Payment >, @InjectModel(User)private readonly userModel : Model < User >) {}
    async payment(phone : string) {
        let newPayment: any = {}
        newPayment.price = (await this.userModel.findOne({phonenumber: phone})).price
        const totalTime = (await this.paymentModel.findOne({phoneNumber: phone})).totalTime
        newPayment.walletBalance = newPayment.price * totalTime
        const payment = await this.paymentModel.findOneAndUpdate({
            phoneNumber: phone
        }, {
            $set: newPayment
        }, {
            new: true,
            upsert: true
        },)

        return payment.toJSON()
    }

}
