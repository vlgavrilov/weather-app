import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  combineLatest } from 'rxjs';
import { environment } from '../environments/env';
import { NodeWithI18n } from '@angular/compiler';



@Injectable()
export class HttpService{
    constructor(private http: HttpClient ){ }
    data1;
    data2;
 
    getData(key){
        
        this.data1  = this.http.get(`${environment.testHost}${environment.key}`)
        this.data2 = this.http.get(`${environment.testHost}${environment.key}`)
        return combineLatest(this.data1, this.data2) 
    }
}