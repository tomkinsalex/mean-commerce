import { Injectable } from "@angular/core";

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth) { }


  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
