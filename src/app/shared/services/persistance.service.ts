import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class PersistanceService {

    set(key:string,value:unknown) {
        try {
            localStorage.setItem(key,JSON.stringify(value))
        } catch (error) {
            console.log(`Error while setting key ${key} with value ${value} in localstrorage `,error)
        }
    }

    get(key:string):unknown {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.log(`Error while getting key ${key} from localstrorage `,error)
            return null;
        }
    }
}