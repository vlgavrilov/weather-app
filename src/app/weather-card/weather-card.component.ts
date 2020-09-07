import { Component, OnInit } from '@angular/core';


export interface Section {
  name: string;
  updated: number;
}

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  test = {"coord": { "lon": 139,"lat": 35},
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 1.52,
    "feels_like": 3.99,
    "temp_min": 0.15,
    "temp_max": 5.71,
    "pressure": 1016,
    "humidity": 93
  },
  "wind": {
    "speed": 0.47,
    "deg": 107.538
  },
  "clouds": {
    "all": 2
  },
  "dt": 1560350192,
  "sys": {
    "type": 3,
    "id": 2019346,
    "message": 0.0065,
    "country": "JP",
    "sunrise": 1560281377,
    "sunset": 1560333478
  },
  "timezone": 32400,
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200
}
  folders: Section[] = [
    {
      name: 'temp',
      updated: this.test.main.temp,
    },
    {
      name: 'feels_like',
      updated: this.test.main.feels_like,
    },
    {
      name: 'humidity',
      updated: this.test.main.humidity,
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
