import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';


@Component({
  selector: 'app-day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss'],

})
export class DayInfoComponent {
  @Input() now;


  ngOnInit(): void {
  }
}
