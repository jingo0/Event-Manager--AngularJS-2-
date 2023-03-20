import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ISession } from "../shared";

@Injectable()
export class VoterService{
    constructor(private http:HttpClient){}

    private handleError<T> (operation = 'operation', result?: T)
    {
      return (error:any): Observable<T> => {
        console.error(error);
        return of(result as T);
      }
    }

    deleteVoter(eventId: number, session:ISession, voterName:string)
    {
        session.voters = session.voters.filter(voter => voter !== voterName);
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url).pipe(catchError(this.handleError('addVoters'))).subscribe();
    }

    addVoter(eventId: number, session:ISession, voterName:string)
    {
        session.voters.push(voterName)
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        let options = { headers: new HttpHeaders({"Content-Type" : 'application/json'})}
        this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoters'))).subscribe();
    }

    userHasVoted(session:ISession, voterName:string)
    {
        return session.voters.some(voter => voter === voterName)
    }
}