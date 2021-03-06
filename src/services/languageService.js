import tokenService from './token-service.js';
import config from '../config';

export default {
    getLanguageData: async () => {
        const token = tokenService.getAuthToken();
        return await new Promise(async (Resolve) => {
            const data = await fetch(`${config.API_ENDPOINT}/language/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }

            })
            Resolve(await data.json())

        })
    },
    getWordsData: async () => {
        const token = tokenService.getAuthToken();
        return await new Promise(async (Resolve) => {
            const words = await fetch(`${config.API_ENDPOINT}/language/head`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }
            })
            Resolve(await words.json())
        })
    },
    postGuess: async(guess)=> {
        
        const token = tokenService.getAuthToken();
        return await new Promise(async(Resolve)=>{
            const data = await fetch(`${config.API_ENDPOINT}/language/guess`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                },
                body: JSON.stringify({ guess: guess })
            })
            Resolve(await data.json())

        })
        
    }
}