import { Component } from '@angular/core';

interface Hell {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  hells: Hell[] = [
    {value: 'inferno-0', viewValue: 'inferno'},
    {value: 'inferno-1', viewValue: 'inferno'},
    {value: 'inferno-1', viewValue: 'Taganrog'},
    {value: 'inferno-2', viewValue: 'inferno'}
  ];
}
