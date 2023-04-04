import { Injectable } from '@angular/core';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

	save(key: string, data: any) {
        let obj;
        let sdate = new Date();
 		sdate.setDate(sdate.getDate() + 1);
        obj = {id:data.id, expiry: sdate} ;
        const dataString = JSON.stringify(obj);
        localStorage.setItem(key, dataString);
        return Promise.resolve();
    }

    load(key: string) {
        const dataString = localStorage.getItem(key);
        return new Promise((resolve) => {
            if (dataString) {
                const dataObj: Item = JSON.parse(dataString);
                const expire_at = dataObj.expiry;
                const today_date = new Date();
                console.log(expire_at);
                if (dataObj.expiry && expire_at > today_date) {
                    //delete dataObj.expiry;
                    resolve(dataObj);
                }
            }
            resolve(null);
        });
    }
    remove(key: string)
    {
        localStorage.removeItem(key);
        return Promise.resolve();
    }

    allStorage() {
        
        return new Promise((resolve) => {
            var favorite = [];
            for (var i = 0; i<localStorage.length; i++) {
            	//this.load(localStorage.key(i));
            	let key = localStorage.key(i) ? localStorage.key(i) : "";
            	if (key) {
                    const val = localStorage.getItem(key);
                    if(val)
                    {
                	   let item = JSON.parse(val);
                        const expire_at = new Date(item.expiry);
                        const today_date = new Date();
                        console.log(expire_at);
                        console.log(today_date);
                        if (expire_at < today_date) {
                            localStorage.removeItem(key);
                        }
                        else{
                            favorite[i] = item.id;
                        }
                   }
            	}
            }
            resolve(favorite);
        });

    }
}
export interface Item {
    expiry: any;
    id: string;
}
