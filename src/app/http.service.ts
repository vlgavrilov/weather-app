import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/env';
import { NodeWithI18n } from '@angular/compiler';

interface CacheResponse {
    date: string;
    nowWeatherResponse: any;
    tenDaysWeatherResponse: any;
}



@Injectable()
export class HttpService{
  constructor(private http: HttpClient ){ }
  data1: [string?] = [];
  elem;
  CacheResponse: Map<string, Anything> = new Map();
    // getData(key){
    //     this.data1  = this.http.get(`${environment.testHost}${environment.key}`);
    //     this.data2 = this.http.get(`${environment.testHost}${environment.key}`);
    //     return combineLatest(this.data1, this.data2);
    // }
  now;
  private isExist: any;
  weather16;
  weatherNow;
  setweather16;
  setweatherNow;
  getWeatherNow(key): Observable<any>{
    return  this.http.get(`${environment.testHost}${environment.key}`);
  }

  getWeather16(key): Observable<any>{
    return  this.http.get(`${environment.testHost}${environment.key}`);
  }

  getTestCashe(key){
    this.now = {
      date: new Date().toDateString();
      minutes: new Date().getMinutes()
    };
    this.elem = this.CacheResponse.get(key);
    if (this.elem && (this.elem.data.date === this.now.month)){

        if (Math.floor(this.elem.data.minutes / 5) === Math.floor(this.now.minutes / 5)) {
            // если всё есть
          return combineLatest(this.weatherNow, this.weather16);
        } else {
          // если обновляем только сейчас
        this.weatherNow = this.getWeatherNow(key)
          .pipe(tap(res => this.setweatherNow = res));
        this.weather16 =  this.getWeather16(key)
          .pipe(tap(res => this.setweather16 = res));

        this.CacheResponse.set(key, {
          data: this.now,
          response: {
            weatherNow: this.weatherNow,
            weather16: this.weather16
          }
        });
        return combineLatest(of(this.elem.weatherNow), this.weather16);
      }}
    // обновляем всё
    this.weatherNow = this.getWeatherNow(key).pipe(tap(res => this.setweatherNow = res));
    this.weather16 =  this.getWeather16(key).pipe(tap(res => this.setweather16 = res));
    this.CacheResponse.set(key, {
      data: this.now,
      response: {
        weatherNow: this.weatherNow,
        weather16: this.weather16
      }
    });
    return combineLatest(this.weatherNow, this.weather16);
  }
}
