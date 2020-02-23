import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserAuth } from '../models/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  register(user: UserAuth){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  login(user: UserAuth){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  logout(){
    return this.afAuth.auth.signOut()
  }

  userAuthenticated(){
    return this.afAuth.user
  }
}
