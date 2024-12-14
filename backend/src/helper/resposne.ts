import { ENVIRONMENT } from "../secret";


export const successResponse = (res:any,sta:Number,details:Object) =>{
    return res.status(sta || 200).json(details);
}


export const failureResposne = (res:any, sta:Number, message:string, error?:any) =>{
    const status_value = sta || 500;
    const error_message = message || 'Internal Server Error'
    if(ENVIRONMENT==="DEVELOPMENT"){
        console.log(error);
        
    }
    return res.status(status_value).json({
        message: error_message
    }) 
}