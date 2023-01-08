import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/enviroments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient,private router: Router) {
    this.user$.next(this.getRole());
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  login(auth: any): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + '/login', auth);
  }

  signup(user: any): Observable<any>{
    const options: any={
      responseType: 'text'
    };

    return this.http.post<string>(
      environment.apiHost + '/passenger',
      user,
      options
    );
  }

  activate(activationId: number): Observable<any>{
    return this.http.get<string>(
      environment.apiHost+'/passenger/activate/' + activationId
      );
  }

  changePw(value: any): Observable<any> {
    return this.http.post<any>(environment.apiHost+'/user/'+this.getId()+'/changePassword', value);
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      let role = helper.decodeToken(accessToken).role[0].name;
      return role;
    }
    return null;
  }

  getId(): number{
    if(this.isLoggedIn()) {
      return new JwtHelperService().decodeToken(localStorage.getItem('user')!).id;
    }
    return 0;
  }

  logout(): void {
    this.user$.next(null);
    localStorage.clear();
    // window.location.reload();
  
  }

  getUserData(): Observable<any>{
    return this.http.get<any>(environment.apiHost+'/user/'+this.getId())
  }

  updateUserData(value: any): Observable<any>{
    if(this.getRole() == 'driver'){
      return this.http.post<any>(environment.apiHost+'/driver/'+this.getId(), value, {
        headers: this.headers,
      });
    } else {
      return this.http.post<any>(environment.apiHost+'/passenger/'+this.getId(), value, {
        headers: this.headers,
      });
    }
  }

}

