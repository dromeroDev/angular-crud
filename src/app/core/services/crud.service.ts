import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { Model } from '@core/models/model';
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

  create(data) {
    return this.firestore.collection('personas').add(data);
  }

  update(data) {
    return this.firestore
      .collection('personas')
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  delete(data) {
    return this.firestore
      .collection('personas')
      .doc(data.payload.doc.id)
      .delete();
  }
}
