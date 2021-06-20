import axios from "axios"
import { tweetsAPI } from "../api/api"

type UploadImgReturnProps = {
    height: number
    size: number
    url: string
    width: number
}

export const uploadImgHelper = async (image: any): Promise<UploadImgReturnProps> => {
    let formData = new FormData()
    formData.append('image', image)
    
    let {data} = await tweetsAPI.uploadImg(formData)

    return data
}