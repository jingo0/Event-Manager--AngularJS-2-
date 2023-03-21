import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>`,
})

export class EventsAppComponent {
  title = 'Angular-fundamental';

  constructor(private auth:AuthService, private route:ActivatedRoute){

  }
  events:any
  ngOnInit()
  {
    this.events = this.route.snapshot.data['events']
    this.auth.checkAuthenticationStatus();
  }
}
