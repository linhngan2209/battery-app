import axiosClient from "./axiosClient"

export const getAllStation = async () => {
    try {
        const result = await axiosClient.get('/charging-station')
        return result.data
     } catch (error) {
        console.log(error)
     }
}

export const postStatusCharging = async (status: string, phoneNumber: string, time?: string, aboutTime?: number) => {
   try {
      console.log(status, phoneNumber, time, aboutTime)
      await axiosClient.post('/control-device', {status, phoneNumber, time, aboutTime})
    } catch (error) {
       console.log(error)
    }
}
