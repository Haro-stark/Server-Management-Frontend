import {Server} from "../interface/server"

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    //question mark is used to indecate that the variable servers is OPTIONAL
    data: { servers?: Server[], server?: Server };
}