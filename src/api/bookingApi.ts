import axiosClient from "./axiosClient"

export const postBookingStation = async (phoneNumber: string, stationName: string, slot: number) => {
    try {
        await axiosClient.post('/control-device/booking', {phoneNumber, stationName, slot})
     } catch (error) {
        console.log(error)
     }
}


