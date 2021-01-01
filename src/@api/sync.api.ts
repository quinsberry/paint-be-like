import axios from 'axios'
import { SuccessResponse, ErrorResponse } from './commonApiTypes'

export const SyncApi = {
  sendImage: async (sessionId: string, image: string) => {
    try {
      const { data } = await axios.post<SuccessResponse<[]>>(`http://localhost:5000/image?id=${sessionId}`, { image })
      return data
    } catch (err) {
      console.log(err.message)
    }
  },

  getImage: async (sessionId: string, currentImage: string) => {
    try {
      const { data } = await axios.post<SuccessResponse<string>>(`http://localhost:5000/image-get?id=${sessionId}`, {
        image: currentImage,
      })
      return data
    } catch (err) {
      console.log(err.message)
    }
  },
}
