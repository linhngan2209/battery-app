import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class ChargingStationDto {
    @IsString()
    stationName : string;

    @IsString()
    location : string;

    @IsNumber()
    totalSlots : number;

    @IsNumber()
    filledSlots : number;

    @IsString()
    operatingHours : string;
    
    bookedPosition : [];
}
