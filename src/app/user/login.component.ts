import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float:right; color:#E05c65; padding-left:10px;}
    `]
})

export class LoginComponent 
{
    userName:any
    password:any
    mouseoverLogin:any
    loginInvalid: any = false

    constructor(private authService:AuthService, private router:Router)
    {
        
    }

    login(formVal: { userName: string; password: string })
    {
        this.authService.loginUser(formVal.userName, formVal.password).subscribe(resp => {
            if(!resp){
                this.loginInvalid = true;
            }else{
                this.router.navigate(['events']);
            }
        })
    }

    cancel()
    {
        this.router.navigate(['events'])
    }

    

    
}