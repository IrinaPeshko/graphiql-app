import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBf1CNG1fckA37O34yTnzLF1tmMi1rpnvQ',
  authDomain: 'graphiql-6a9a3.firebaseapp.com',
  projectId: 'graphiql-6a9a3',
  storageBucket: 'graphiql-6a9a3.appspot.com',
  messagingSenderId: '771629218213',
  appId: '5f75a0cb37974a894bd04c',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
