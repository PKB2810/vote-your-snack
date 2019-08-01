import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyD8FGV9KRaFr1qxABb45hcw-DFEyjglq3E",
  authDomain: "snack-app-5cec3.firebaseapp.com",
  databaseURL: "https://snack-app-5cec3.firebaseio.com",
  projectId: "snack-app-5cec3",
  storageBucket: "",
  messagingSenderId: "756242063233",
  appId: "1:756242063233:web:c83c289bf395e1b9"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
