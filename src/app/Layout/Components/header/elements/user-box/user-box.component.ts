import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ThemeOptions } from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  name:any;
  faCalendar = faCalendar;

  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions, private router:Router) {
  }

  ngOnInit() {
    
    let user=localStorage.getItem("user")
    this.name=user.split('@')[0]
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
