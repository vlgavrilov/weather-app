import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of,} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../environments/env';


interface CacheItem {
  time: Time;
  response: {
    weatherNow: object;
    weather16: object;
  };
}

interface Time {
  date: string;
  minutes: number;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }


  CacheResponse: Map<string, CacheItem> = new Map();

  getWeatherNow(cityId: string): Observable<any> {
    return this.http.get(`${environment.HOST}current?city_id=${cityId}&key=${environment.KEY}`);
  }

  getWeather16(cityId: string): Observable<any> {
    return this.http.get(`${environment.HOST}forecast/daily?city_id=${cityId}&key=${environment.KEY}`);
  }

  // caches weather requests
  getWeather(cityId): Observable<any> {
    const currentTime: Time = {
      date: new Date().toDateString(),
      minutes: new Date().getMinutes()
    };
    const cacheItem: CacheItem = this.CacheResponse.get(cityId);
    // do not request for multi-day weather if data was requested today
    if (cacheItem && (cacheItem.time.date === currentTime.date)) {
      // do not request for the weather now if data was requested in the current five minutes
      if (Math.floor(cacheItem.time.minutes / 5) === Math.floor(currentTime.minutes / 5)) {
        return combineLatest([of(cacheItem.response.weatherNow), of(cacheItem.response.weather16)]);
      } else {
        const weatherNow = this.getWeatherNow(cityId);

        return combineLatest([weatherNow, of(cacheItem.response.weather16)]).pipe(
          tap(([setWeatherNow, setWeather16]) => {
            this.CacheResponse.set(cityId, {
              time: currentTime,
              response: {
                weatherNow: setWeatherNow,
                weather16: setWeather16
              }
            });
          })
        );
      }
    } else {
      const weatherNow = this.getWeatherNow(cityId);
      const weather16 = this.getWeather16(cityId);

      return combineLatest([weatherNow, weather16]).pipe(
        tap(([setWeatherNow, setWeather16]) => {
          this.CacheResponse.set(cityId, {
            time: currentTime,
            response: {
              weatherNow: setWeatherNow,
              weather16: setWeather16
            }
          });
        })
      );
    }
  }
}
