
import { ENVIRONMENT } from "../secret";

export const validateDate = (data:any,schema:any) =>{
    try {
        const validationResult = schema.safeParse(data);
        if(!validationResult.success){
            const errorMessages = validationResult.error.flatten();
            console.log(errorMessages);
            
            const fieldErrors = errorMessages.fieldErrors;
            const message = Object.entries(fieldErrors)
            .map(([field, messages]) => 
                // @ts-ignore
                `${field}: ${messages.join(', ')}`)
            .join('; ');
            
            return { message }
        }
    
    const value = validationResult.data
    return { value }
 } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(error);   
        }
        return {error:'Invalid input'}
    }
}