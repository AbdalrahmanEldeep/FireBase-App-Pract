import './style.css'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyCGp0LW2zPvfUdAmmapq6PKP4T-SrT_ZC8",
  authDomain: "tester-f939c.firebaseapp.com",
  projectId: "tester-f939c",
  storageBucket: "tester-f939c.appspot.com",
  messagingSenderId: "620325325006",
  appId: "1:620325325006:web:23da646a44f45a0e78689f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

document.querySelector(".sign").addEventListener("click",() =>{
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

})

document.querySelector('#app').innerHTML = `
  <button class="sign">Login</button>
`

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.displayName);
  } else {
  }
});
