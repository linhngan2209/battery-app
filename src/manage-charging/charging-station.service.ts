import { Injectable } from '@nestjs/common'
import { ChargingStation } from './charging-station.model'
import { Model } from 'mongoose'
import { InjectModel } from '@m8a/nestjs-typegoose'

@Injectable()
export class ChargingStationService {
    constructor(
        @InjectModel(ChargingStation) private readonly chargingStationModel : Model<ChargingStation>
    ) {}
    
    async getAllChargingStation () {
        const getAllChargingStation =  await this.chargingStationModel.find();
        return getAllChargingStation
    }
}
