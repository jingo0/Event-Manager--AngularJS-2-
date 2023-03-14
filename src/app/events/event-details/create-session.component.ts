import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {  FormControl, FormGroup,  Validators } from '@angular/forms'
import { Router } from "@angular/router";
import { ISession } from "../shared";

@Component({
    selector: 'create-session',
    templateUrl:`./create-session.component.html`,
    styles: [`
  em {float:right; color:#E05c65; padding-left:10px;},
  .error input, .error select, .error textarea {background-color: #E3C3C5 !important;},
  .error :: -webkit-input-placeholder {color: #999;}
  .error :: -moz-placeholder {color: #999;}
  .error : -moz-placeholder {color: #999;}
  .error :ms-input-placeholder {color: #999;}
`]
})

export class CreatSessionComponent implements OnInit{
    @Output() saveNewSession = new EventEmitter<ISession>()
    @Output() cancelAddSession = new EventEmitter()

    newSessionForm!: FormGroup;
    name!: FormControl;
    presenter!: FormControl;
    level!: FormControl;
    duration!: FormControl;
    abstract!: FormControl;

    constructor(private router:Router) {}

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo', 'bar'])])

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
            id: undefined as unknown as number
        }
        this.saveNewSession.emit(session)
    }

    private restrictedWords(words: any[])
    {
        return (control: FormControl): {[key : string] : any} => 
        {
            if(!words) return null as any

            var invalidWords = words.map((w: any)=> control.value.includes(w) ? w:null).filter(w=> w!=null)

            return invalidWords && invalidWords.length>0 ? {'restrictedWords': invalidWords.join(', ')}: null as any
        } 
    }

    cancel()
    {
        this.cancelAddSession.emit()
    }
    
}