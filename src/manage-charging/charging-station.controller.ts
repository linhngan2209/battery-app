import { Controller, Post, Body, Logger, Get } from "@nestjs/common";
import { ChargingStationDto } from "./dto/chargingStation.dto";
import { ChargingStationService } from "./charging-station.service";

@Controller('charging-station')
export class ChargingStationController {
    constructor(private readonly chargingStationService: ChargingStationService) {}

    @Get()
    async getAllChargingStation () {
        return this.chargingStationService.getAllChargingStation()
    }
}