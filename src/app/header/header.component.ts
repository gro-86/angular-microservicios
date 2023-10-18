import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  is_user_logged_in: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
}
