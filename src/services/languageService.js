import tokenService from './token-service.js';
import config from '../config';
const token = tokenService.getAuthToken();
export default {
    getLanguageData:async()=>
    {
        console.log(token);
        return await new Promise(async(Resolve)=>{
            const data = await fetch(`${config.API_ENDPOINT}/language/`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${token}`
                }
                
            })
            Resolve(await data.json())

        })
    }
    

}