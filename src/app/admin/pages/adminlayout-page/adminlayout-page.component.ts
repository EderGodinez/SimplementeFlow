import { Component } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  templateUrl: './adminlayout-page.component.html',
  styleUrls: ['./adminlayout-page.component.scss']
})
export class AdminlayoutPageComponent {
  title = 'sidenav';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
