import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { IUser } from "./user.model";

@Injectable()
export class AuthService{
    currentUser!: IUser;
    constructor(private http: HttpClient){}
    loginUser(userName: string, password: string)
    {
        let loginInfo = { username: userName, password: password};
        let options = { headers: new HttpHeaders({"Content-Type" : 'application/json'})}
        return this.http.post('api/login', loginInfo, options)
        .pipe(tap(((data:any) => {
            this.currentUser = <IUser>data['user'];
        })))
        .pipe(catchError(err => {return of(false)}))
        // this.currentUser = {
        //     id:1,
        //     userName: userName,
        //     firstName: 'Jinang',
        //     lastName: 'Shah'
        // }
    }

    isAuthenticated()
    {
        return !!this.currentUser
    }

    updateCurrentUser(firstName:string, lastName:string)
    {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        let options = { headers: new HttpHeaders({"Content-Type" : 'application/json'})}
        return this.http.put(`api/users/${this.currentUser.id}`, this.currentUser, options)
        
    }

    checkAuthenticationStatus()
    {
        this.http.get('/api/currentIdentity').subscribe(data => {
            if(data instanceof Object)
            {
                this.currentUser = <IUser>data
            }
        })
    }

    logOut()
    {
        this.currentUser = undefined as unknown as IUser;
        let options = { headers: new HttpHeaders({"Content-Type" : 'application/json'})}
        return this.http.post('api/logout', {}, options);
    }

}