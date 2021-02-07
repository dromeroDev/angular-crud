// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:9090/crud/api',
  envName: 'DEV',
  firebaseConfig: {
    apiKey: 'AIzaSyCZljioDjmEe3fJlxHxe8lR9MMVnNfbXFk',
    authDomain: 'crud-15052.firebaseapp.com',
    databaseURL: 'https://crud-15052-default-rtdb.firebaseio.com',
    projectId: 'crud-15052',
    storageBucket: 'crud-15052.appspot.com',
    messagingSenderId: '343990328715',
    appId: '1:343990328715:web:e4bbe42de7b725977d638e',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
