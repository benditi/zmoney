import { httpService } from "./http.service"

export const counterService = {
    saveDateNow
}

// async function switchCounter(isCountOn){
//     return httpService.get(`user/counter/${isCountOn}`, )
// }

async function saveDateNow(dateNow){
    return httpService.get(`user/counter/${dateNow}`)
}
