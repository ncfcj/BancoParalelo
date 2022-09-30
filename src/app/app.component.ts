import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router
  ){
  }
  title = 'banco-paralelo';

  getClassByRoute(){
    if(this.router.url === '/login'){
      return "hide";
    }
    return "";
  }
}
