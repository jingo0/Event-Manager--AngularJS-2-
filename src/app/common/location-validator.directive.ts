import { Directive } from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector:'[validateLocation]',
    providers: [
        {
            provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true
        }
]
})

export class LocationValidator implements Validator{
    validate(formGroup: FormGroup): {[key:string]:any} {
        let addressControl = formGroup.controls['address']
        let cityControl = formGroup.controls['city']
        let countryControl = formGroup.controls['country']
        let onlineUrlcontrol = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((addressControl && addressControl.value && cityControl && cityControl.value && 
            countryControl && countryControl.value) || (onlineUrlcontrol && onlineUrlcontrol.value))
            {
                return null as unknown as object;
            }
            else{
                return {validateLocation: false}
            }
    }
}