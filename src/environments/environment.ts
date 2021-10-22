import { firebaseConfig } from './firebaseConfig';

export const environment = {
  production: false,
  serverUrl: 'http://localhost:9090/crud/api',
  envName: 'DEV',
  firebaseConfig: {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  },
};
