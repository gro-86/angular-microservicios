import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error_message = 'There has been an error!';

  constructor() { }

  ngOnInit(): void {
  }

}
