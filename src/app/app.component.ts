import {Component, OnInit} from '@angular/core';
import { HttpService} from './http.service';
import { environment } from '../environments/env';
import {FormControl} from '@angular/forms';


interface Hell {
  value: string;
  viewValue: string;
}
interface Weather {
  [index: number]:
    {
      'moonrise_ts': number,
      'wind_cdir': string,
      'rh': number,
      'pres': number,
      'high_temp': number,
      'sunset_ts': number,
      'ozone': number,
      'moon_phase': number,
      'wind_gust_spd': number,
      'snow_depth': number,
      'clouds': number,
      'ts': number,
      'sunrise_ts': number,
      'app_min_temp': number,
      'wind_spd': number,
      'pop': number,
      'wind_cdir_full': string,
      'slp': number,
      'moon_phase_lunation': number,
      'valid_date': string,
      'app_max_temp': number,
      'vis': number,
      'dewpt': number,
      'snow': number,
      'uv': number,
      'weather': {
        'icon': string,
        'code': number,
        'description': string
      },
      'wind_dir': number,
      'max_dhi': null,
      'clouds_hi': number,
      'precip': number,
      'low_temp': number,
      'max_temp': number,
      'moonset_ts': number,
      'datetime': string,
      'temp': number,
      'min_temp': number,
      'clouds_mid': number,
      'clouds_low': number
    };
}
// interface WeatherData10 {
//   'data': Data10;
//   'city_name': string;
//   'lon': number;
//   'timezone': string;
//   'lat': number;
//   'country_code': string;
//   'state_code': string;
//
// }

// interface WeatherData {
//   [index: number]: {
//     'rh': number, // !
//     'pod': string,
//     'lon': number,
//     'pres': number,
//     'timezone': string,
//     'ob_time': string,
//     'country_code': string,
//     'clouds': number, // ! %
//     'ts': number,
//     'solar_rad': number,
//     'state_code': string,
//     'city_name': string,
//     'wind_spd': number, // !
//     'wind_cdir_full': string, // !
//     'wind_cdir': string,
//     'slp': number,
//     'vis': number, // Visibility (default KM).
//     'h_angle': number,
//     'sunset': string,
//     'dni': number,
//     'dewpt': number,
//     'snow': number,
//     'uv': number,
//     'precip': number, // Liquid equivalent precipitation rate (default mm/hr).
//     'wind_dir': number,
//     'sunrise': string,
//     'ghi': number,
//     'dhi': number,
//     'aqi': number,
//     'lat': number,
//     'weather': {
//       'icon': string, // !
//       'code': number,
//       'description': string
//     },
//     'datetime': string,
//     'temp': number, // !
//     'station': string,
//     'elev_angle': number,
//     'app_temp': number // !  Apparent/"Feels Like" temperature (default Celcius).
// };}
//
// interface WeatherResponse {
//    'data': WeatherData;
//   'count'?: number;
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit{
  hells: Hell[] = [
    {value: 'inferno-0', viewValue: 'inferno'},
    {value: 'inferno-1', viewValue: 'inferno'},
    {value: 'inferno-3', viewValue: 'Taganrog'},
    {value: 'inferno-4', viewValue: 'inferno'}
  ];


  constructor(private httpService: HttpService){}

  currentWeatherData: Weather = environment.mockDataNow.data[0];
  todayWeatherData: Weather = environment.mockDataDay10.data[0];
  threeDaysWeatherData: Weather[] = environment.mockDataDay10.data.slice(0, 3);
  tenDaysWeatherData: Weather[] = environment.mockDataDay10.data.slice(0, 10);

  onFoodSelection1(q): void {
    this.httpService
      .getTestCache(q)
      .subscribe(([data1, data2]) => {
        console.log(data1);
        console.log(data2);
      });
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  ngOnInit(): void{
    this.httpService
      .getTestCache('london')
      .subscribe(([data1, data2]) => {
      console.log(data1);
      console.log(data2);
    });
  }
}
function compareFn(v1: Hell, v2: Hell): boolean {
  return v1 && v2 ? v1.value === v2.value : v1 === v2;
}
