import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { from } from "rxjs";
import { ISession } from "../shared";

@Component({
    templateUrl:`./create-session.component.html`,
    styles: [`
  em {float:right; color:#E05c65; padding-left:10px;},
  .error input, .error select, .error textarea {background-color: #E3C3C5 !important;},
  .error :: -webkit-input-placeholder {color: #999;}
  .error :: -moz-placeholder {color: #999};
  .error : -moz-placeholder {color: #999;}
  .error :ms-input-placeholder {color: #999;}
`]
})

export class CreatSessionComponent implements OnInit{

    newSessionForm!: FormGroup;
    name!: FormControl;
    presenter!: FormControl;
    level!: FormControl;
    duration!: FormControl;
    abstract!: FormControl;

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(4)])

        this.newSessionForm = new FormGroup(
        {
            name:this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    saveSession(formVal:ISession)
    {
        let session:ISession = {
            name: formVal.name,
            duration: formVal.duration,
            level: formVal.level,
            presenter: formVal.presenter,
            abstract: formVal.abstract,
            voters: [],
            id: 999
        }
    }
}