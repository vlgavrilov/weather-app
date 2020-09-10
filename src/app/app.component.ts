import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {FormControl} from '@angular/forms';


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

enum Cities{
  Taganrog = 'Taganrog',
  New_Berlin = 'New Berlin',
  Moscow = 'Moscow',
  London = 'London',
  Paris = 'Paris',
}

enum CitiesId{
  Taganrog = '484907',
  New_Berlin = '4245481',
  Moscow = '5202009',
  London = '4119617',
  Paris = '4246659',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit{
  hells: Hell[] = [
    {value: '4119617', viewValue: 'London'},
    {value: '4245481', viewValue: 'New Berlin'},
    {value: '484907', viewValue: 'Taganrog'},
    {value: '4246659', viewValue: 'Paris'},
    {value: '5202009', viewValue: 'Moscow'},

  ];
  DEFAULT_CITY = CitiesId.Taganrog;

  selected = new FormControl(this.DEFAULT_CITY);

  constructor(private httpService: HttpService){}

  currentWeatherData: Weather;
  todayWeatherData: Weather;
  threeDaysWeatherData: Weather[];
  tenDaysWeatherData: Weather[];



  onTownSelection(q): void {
    this.httpService
      .getWeather(q)
      .subscribe(([data1, data2]) => {
        this.currentWeatherData = data1.data[0];
        this.todayWeatherData = data2.data[0];
        this.threeDaysWeatherData = data2.data.slice(0, 3);
        this.tenDaysWeatherData = data2.data.slice(0, 10);
      });
  }


  ngOnInit(): void{
    this.onTownSelection(this.DEFAULT_CITY);
  }
}
