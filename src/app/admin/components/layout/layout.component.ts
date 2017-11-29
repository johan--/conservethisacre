import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /**
   * Left menu state
   * @type {boolean}
   */
  enlarged = false;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Handles click on the menu icons
   */
  onMenuClick() {
    this.enlarged = !this.enlarged;
  }
}
