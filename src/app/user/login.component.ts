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

    constructor(private authService:AuthService, private router:Router)
    {
        
    }

    login(formVal: { userName: string; password: string })
    {
        this.authService.loginUser(formVal.userName, formVal.password)
        this.router.navigate(['events'])
    }

    cancel()
    {
        console.log("cancel was clicked")
        this.router.navigate(['events'])
    }

    

    
}