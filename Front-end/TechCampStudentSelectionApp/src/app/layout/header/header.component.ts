import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visibleSidebar3 = false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    /* this.dialog.open(LoginComponent, {
      position: {top: '5%',right:'0%'},
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }); */
  }

}
