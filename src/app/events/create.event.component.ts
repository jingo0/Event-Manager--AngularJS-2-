import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";

@Component({
    templateUrl:`./create-event.component.html`,
    styles: [`
  em {float:right; color:#E05c65; padding-left:10px;},
  .error input {background-color: #E3C3C5 !important;},
  .error :: -webkit-input-placeholder {color: #999;}
  .error :: -moz-placeholder {color: #999};
  .error : -moz-placeholder {color: #999;}
  .error :ms-input-placeholder {color: #999;}
`]
})

export class CreateEventComponent 
{
    newEvent:any
    isDirty:boolean = true
    constructor(private router:Router, private eventService:EventService)
    {

    }
    cancel()
    {
        this.router.navigate(['/events'])
    }

    saveEvent(formValues:any){        
        this.eventService.saveEvent(formValues).subscribe(() => {            
            this.router.navigate(['/events'])
            // setTimeout(() => window.location.reload(),100); //temp fix     
            this.isDirty=false
        })        
    }

    ngOnInit() {
        this.newEvent = {
            name: 'Ng spectacular',
            date: '8/8/2028',
            time:'10am',
            price: 799.99,
            location: {
                address: "456 Hardy st",
                city: "Houston",
                country: "USA",
            },
            onlineUrl: 'https://ashdkasdf.com',
            imageUrl: 'sjsdf/sdf.png'
        }
    } 

    
}