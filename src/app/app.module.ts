import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { TaoastrService } from './common/toastr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  EventListComponent,
  CreateEventComponent,
  EventListResolver,
  CreatSessionComponent,
  SessionListComponent,
  CollapsibleWellComponent,
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { Error404Component } from './error/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreatSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [
    EventService, 
    TaoastrService, 
    EventRouteActivator,
    {
      provide:'canDeactivateCreateEvent', 
      useValue: checkDirtyStates
    },
    EventListResolver,
    AuthService
  ],
  bootstrap: [EventsAppComponent]})
export class AppModule { }

export function checkDirtyStates(component:CreateEventComponent)
{
  if(component.isDirty)
  {
    return window.confirm('You have not saved this event, do yu really want to cancel?')
  }
  return true
}
