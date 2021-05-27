import { AxiosResponse } from "axios";

export let data = (param: any) => {
    return param.then((response:AxiosResponse<any> ) => {
        return response.data;
    });
}