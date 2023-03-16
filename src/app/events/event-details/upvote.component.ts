import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'upvote',
    template:`
    <div class="votingWidgetContainer pointable" (click) = "onClick()">
        <div class="well votingWidget">
            <div class="votingButton">
                <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
                <div>
                    <div class="badge badge-inverse votinCount">
                        <div> {{count}} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls:[`./upvote.component.css`]
})

export class upvoteComponent
{
    @Input()
    count!: number;
    iconColor!: string;
    @Input()
    set voted(val: any){
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();
    onClick()
    {
        this.vote.emit();
    }
}