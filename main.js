import './style.css'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged ,updateProfile, signOut, updateEmail} from "firebase/auth";
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

const user = auth.currentUser;




let userName,email,photo,status,Log = "Login";



window.addEventListener("DOMContentLoaded",() =>{
  appendElements();
})

async function appender (e){
  e.preventDefault();
  console.log("dobe");
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    email = user.email;
    userName = user.displayName;
    photo = user.photoURL;
    status = user.emailVerified;
    Log ="Logout";
    appendElements(); 
  } else {
      email = "";
      userName = "";
      photo = "";
      status ="";
      Log ="Login";
      appendElements(); 
      console.log('There\'s not users')
  }
});


function appendElements(){
 document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <div class ="side-bare">
        <div class="container">
          <div class="info">
              <div class="user-photo"><img src="${photo}" alt /></div>
                <div class ="user-name-email">
                  <div class="inp-box">
                     <input disabled class="name-inp" value= ${userName ? userName :""}>
                     <p class="edit" data="name">Edit</p> 
                  </div>
                  <div class="inp-box">
                    <input disabled class="email-inp" value=${email? email : ""}>
                    <p class="edit" data="email">Edit</p>
                  </div>
                  <button class="save-btn" style="display:none">Save</button>
              </div>
          </div>
        </div>
    </div>
    <form>
      <button class="appender__data">Append</button>
      <button class="login">${Log}</button>
    </form>
  </div>
`

document.querySelector(".appender__data").addEventListener("click",appender)

document.querySelector(".login").addEventListener("click",(e) =>{
  e.preventDefault();
  if(status){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }else{
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
      // ...
    });

  }
})


document.querySelectorAll(".edit").forEach((e) =>{
  e.addEventListener("click",({target}) =>{
    if(target.getAttribute("data") == "name"){
      document.querySelector(".save-btn").style.display = "block";
      document.querySelector(".name-inp").removeAttribute("disabled");       
      document.querySelector(".email-inp").setAttribute("disabled",null);   
    }else{
      document.querySelector(".save-btn").style.display = "block";
      document.querySelector(".email-inp").removeAttribute("disabled"); 
      document.querySelector(".name-inp").setAttribute("disabled",null);       
    }
  })
})

document.querySelector(".save-btn").addEventListener("click",({target}) =>{
  target.style.display = "none";
  document.querySelector(".name-inp").setAttribute("disabled",null);       
  document.querySelector(".email-inp").setAttribute("disabled",null);       
  if(confirm("You Will Update Your Profile Data")){
    updateProfile(auth.currentUser, {
      displayName:  document.querySelector(".name-inp").value,
    }).then(() => {

    }).catch((error) => {
      // An error occurred
      // ...
    });


    updateEmail(auth.currentUser,document.querySelector(".email-inp").value).then(() => {
      alert("Your Data has been Updated");
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
})

}

