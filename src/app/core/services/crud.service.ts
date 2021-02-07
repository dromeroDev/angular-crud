import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

const BASE: string = env.serverUrl;
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestore: AngularFirestore) {}

  getAll() {
    return this.firestore.collection('personas').snapshotChanges();
  }

  create(id, data) {
    return this.firestore.collection('personas').add(data);
  }

  update(id, data) {
    return this.firestore.collection('personas').doc(id).set(data);
  }

  delete(id) {
    return this.firestore.collection('personas').doc(id).delete();
  }
}
