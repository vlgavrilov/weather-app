import { Component, OnChanges } from '@angular/core';
import { Input} from '@angular/core';


@Component({
  selector: 'app-day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss'],

})
export class DayInfoComponent implements OnChanges{
  @Input() currentWeatherData;
  @Input() todayWeatherData;
  currentWeather;
  todayWeather;

  asIsOrder(a, b): number {
    return 1;
  }
  ngOnChanges(): void{
    this.currentWeather = new Map();
    this.currentWeather.set('Wind speed', this.currentWeatherData.wind_spd);
    this.currentWeather.set('Relative humidity', this.currentWeatherData.rh);
    this.currentWeather.set('Cloud coverage', this.currentWeatherData.clouds);
    this.currentWeather.set('Temperature', this.currentWeatherData.temp);
    this.currentWeather.set('"Feels Like" temperature ', this.currentWeatherData.app_temp);
  }
}
