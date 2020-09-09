import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/env';



@Injectable()
export class HttpService{
  constructor(private http: HttpClient ){ }
  elem;
  CacheResponse: Map<string, any> = new Map();
  now;
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

  // caches weather requests
  getTestCache(key): Observable<any>{
    this.now = {
      date: new Date().toDateString(),
      minutes: new Date().getMinutes()
    };
    this.elem = this.CacheResponse.get(key);
    if (this.elem && (this.elem.data.date === this.now.date)){
        if (Math.floor(this.elem.data.minutes / 5) === Math.floor(this.now.minutes / 5)) {
          return combineLatest([of(this.elem.response.weatherNow), of(this.elem.response.weather16)]);
        } else {
        this.weatherNow = this.getWeatherNow(key)
          .pipe(tap(res => this.setweatherNow = res));
        this.CacheResponse.set(key, {
          data: this.now,
          response: {
            weatherNow: this.weatherNow,
            weather16: this.elem.response.weather16
          }
        });
        return combineLatest([of(this.elem.response.weatherNow), this.weather16]);
      }}
    this.weatherNow = this.getWeatherNow(key)
      .pipe(tap(res => this.setweatherNow = res));
    this.weather16 =  this.getWeather16(key)
      .pipe(tap(res => this.setweather16 = res));
    this.CacheResponse.set(key, {
      data: this.now,
      response: {
        weatherNow: this.setweatherNow,
        weather16: this.setweather16
      }
    });
    return combineLatest([this.weatherNow, this.weather16]);
  }
}
