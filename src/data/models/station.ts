export interface ChargingStation {
    _id: string | null | undefined;
    stationName: string,
    location: string,
    totalSlots: number,
    filledSlots: number,
    operatingHours: string,
    bookedPosition: number[],
}