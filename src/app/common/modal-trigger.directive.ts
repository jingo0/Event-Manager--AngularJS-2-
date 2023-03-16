import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({
    selector:'[modal-trigger]',
})

export class ModalTriggerDirective implements OnInit
{
    @Input('modal-trigger') modelId!:string;
    private el!:HTMLElement
    constructor(@Inject(JQ_TOKEN) private $ : any, ref:ElementRef)
    {
        this.el = ref.nativeElement;
    }
    ngOnInit() 
    {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modelId}`).modal({})
        })        
    }

    

}