import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
