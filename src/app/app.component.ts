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
