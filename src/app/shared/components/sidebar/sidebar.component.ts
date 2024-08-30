import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  styles: `
    li {
      cursor: pointer;
    }
  `,
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
