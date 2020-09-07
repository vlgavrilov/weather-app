import { Component } from '@angular/core';
import { HttpService} from './http.service';


interface Hell {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent {
  hells: Hell[] = [
    {value: 'inferno-0', viewValue: 'inferno'},
    {value: 'inferno-1', viewValue: 'inferno'},
    {value: 'inferno-1', viewValue: 'Taganrog'},
    {value: 'inferno-2', viewValue: 'inferno'}
  ];
  constructor(private httpService: HttpService){}

  now = {}
  day10 = {}

  ngOnInit(){
    this.httpService.getData("6a091de9d53deee7144cb4f5acea2004").subscribe(([data1, data2]) =>{
      this.now=data1;
      this.day10=data2;
    })
  }
}
