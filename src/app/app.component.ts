import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../environments/env';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';


interface Hell {
  value: string;
  viewValue: string;
}
interface Weather {
  [index: number]:
    {
      readonly 'moonrise_ts': number,
      readonly 'wind_cdir': string,
      readonly 'rh': number,
      readonly 'pres': number,
      readonly 'high_temp': number,
      readonly 'sunset_ts': number,
      readonly 'ozone': number,
      readonly 'moon_phase': number,
      readonly 'wind_gust_spd': number,
      readonly 'snow_depth': number,
      readonly 'clouds': number,
      readonly 'ts': number,
      readonly 'sunrise_ts': number,
      readonly 'app_min_temp': number,
      readonly 'wind_spd': number,
      readonly 'pop': number,
      readonly 'wind_cdir_full': string,
      readonly 'slp': number,
      readonly 'moon_phase_lunation': number,
      readonly 'valid_date': string,
      readonly'app_max_temp': number,
      readonly 'vis': number,
      readonly 'dewpt': number,
      readonly 'snow': number,
      readonly 'uv': number,
      readonly 'weather': {
        readonly 'icon': string,
        readonly 'code': number,
        readonly 'description': string
      },
      readonly 'wind_dir': number,
      readonly 'max_dhi': null,
      readonly 'clouds_hi': number,
      readonly 'precip': number,
      readonly 'low_temp': number,
      readonly 'max_temp': number,
      readonly 'moonset_ts': number,
      readonly 'datetime': string,
      readonly 'temp': number,
      readonly 'min_temp': number,
      readonly 'clouds_mid': number,
      readonly'clouds_low': number
    };
}


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

  selected = new FormControl('inferno-0');

  constructor(private httpService: HttpService){}

  currentWeatherData: Weather = environment.mockDataNow.data[0];
  todayWeatherData: Weather = environment.mockDataDay10.data[0];
  threeDaysWeatherData: Weather[] = environment.mockDataDay10.data.slice(0, 3);
  tenDaysWeatherData: Weather[] = environment.mockDataDay10.data.slice(0, 10);

  onTownSelection(q): void {
    this.httpService
      .getTestCache(q)
      .subscribe(([data1, data2]) => {
        console.log(data1);
        console.log(data2);
      });
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
