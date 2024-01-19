import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  /* styles: [`::ng-deep .specific-class > .mat-expansion-indicator:after {
    color: white;
  }`] */
})
export class SidebarComponent implements OnInit {
  showFiller = false;
  visibleSidebar3 = false;

  constructor() { }

  ngOnInit(): void {
  }
  changeVisibleSidebar(){
    this.visibleSidebar3 =!this.visibleSidebar3;
  }
}
