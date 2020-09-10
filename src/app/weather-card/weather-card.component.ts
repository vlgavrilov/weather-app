import {Component, Input, OnChanges, } from '@angular/core';


export interface Section {
  name: string;
  updated: number;
}

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnChanges {
  constructor() { }
  @Input() dayWeatherData;
  @Input() head: string;
  dayWeather: Map<string, string | number>;

  asIsOrder(a, b): number {
    return 1;
  }

  ngOnChanges(): void {
    this.dayWeather = new Map<string, string | number>();
    this.dayWeather.set('Wind speed', this.dayWeatherData?.wind_spd);
    this.dayWeather.set('Relative humidity', this.dayWeatherData?.rh);
    this.dayWeather.set('Cloud coverage', this.dayWeatherData?.clouds);
    this.dayWeather.set('Maximum temperature ', this.dayWeatherData?.app_max_temp);
    this.dayWeather.set('Temperature', this.dayWeatherData?.temp);
    this.dayWeather.set('Minimum temperature', this.dayWeatherData?.min_temp);
  }
}
