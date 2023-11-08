import axiosClient from "./axiosClient"

export const postPayment = async (phoneNumber: string) => {
    try {
        const response = await axiosClient.post('/payment', {phoneNumber})
        return response.data
     } catch (error) {
        console.log(error)
     }
}


