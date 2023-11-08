import { Controller, Post, Body, Logger, Get, Param,Res } from "@nestjs/common";
import { ControlDeviceService } from "./control-device.service";
import { Response } from 'express';
import { sign } from "crypto";

@Controller('control-device')
export class ControlDevicenController {
    constructor(private readonly controldeviceService:ControlDeviceService ) {}

    @Post()
    async controlDevice (@Res() res ,@Body('status') status: string, @Body('phoneNumber') phone: string,@Body('time') time: string, @Body('aboutTime') aboutTime: number) {
        return this.controldeviceService.controlDevice(res, status,phone,time,aboutTime)
    }
    @Post('booking')
    async booking (@Body('phoneNumber') phoneNumber: string, @Body('stationName') stationName: string,@Body('slot') slot: number) {
        return this.controldeviceService.insertBooking(phoneNumber,stationName,slot)
    }
}