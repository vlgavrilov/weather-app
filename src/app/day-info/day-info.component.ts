import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';


@Component({
  selector: 'app-day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss'],

})
export class DayInfoComponent {
  @Input() now;

  // parseDat = JSON.stringify(this.day)
  // weather:any = {now: {}, day10: {}}

  ngOnInit(): void {

// console.log(this.day);
// console.log(this.weather.now);÷

  }
}
