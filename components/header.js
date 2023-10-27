import {DateTime} from 'luxon';
import { app } from '../firebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from '@firebase/auth' 

/*Global Elements */
const authDataEl = document.getElementById('auth-data')
const authDataImgEl = document.getElementById('auth-img')

/* Time Component */
//creates a first value to get the time using luxon
let myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)

//sets the <p id="time-data"> to myValue, then setInterval will change the data every minute
export function renderTime(elem){
  elem.textContent = myValue;
  setInterval(()=>{
    myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
    elem.textContent = myValue;
  },60000)
  
}

/* Weather Component */
const weatherAccess = '9575f3355ae129dc91424b5712a7695e'
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

//sets the <div id="weather-container"> when the Weather API gathers the info needed
export function renderWeather(elem){
    //gets the coords if user allows 
  navigator.geolocation.getCurrentPosition(position => {
    //takes those coords and fetches the weather information with it
    fetch(`${weatherUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${weatherAccess}`)
          .then(res=>{
              if(!res.ok){
                //if the data is not available but wasn't an error with the call itself says data not available
                  throw Error('Weather data not available')
              }
              //otherwise returns the data
              return res.json()
          })
          .then(data=>{
            //  uses that data in a img DOM element created with id,src, and class
             let img = document.createElement('img')
             img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
             img.id = '--weather-condition-icon'
             img.classList.add('icon')
            //this image is then added to the container
             elem.appendChild(img)
          })
          .catch(err=>{
            //if the fetch errors rather than having no data then remove the container altogether
              elem.remove()
          })
  })
}

/* Sign In */
const auth = getAuth()
const googleProvider = new GoogleAuthProvider();

export function handleGoogle(e){
    e.preventDefault()
    //if we have a user signed in already signout from firebase
    if(auth.currentUser){
        signOut(auth)
            .then(()=>{
                console.log('signout successful')
            })
    } else {
        //no user signed in open google popup for sign in
        signInWithPopup(auth, googleProvider)
        .then((results)=>{
            const credential = GoogleAuthProvider.credentialFromResult(results);
            const token = credential.accessToken;
            //currently just holding user in this function - will need to make global if I need it
            //shouldn't though as I can get it from auth
            const user = results.user;
        }).catch((error)=>{
            const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(`Error: ${errorCode} - ${errorMessage}`);
                console.log(`Additional Error Info: ${email} - ${credential}`);
        })
    }
    
  }

  //any time the user changes from logined in to logged out
  onAuthStateChanged(auth, (user) => {
    if(user) {
        updateUser(user)
    } else {
        updateSignIn()
    }
  });

  //changes text signin to display name and image to the image google has
  function updateUser(user){
        authDataEl.textContent = user.displayName;
        authDataImgEl.src = user.photoURL;
        authDataImgEl.classList.add('authenticated-img')
        authDataEl.classList.add('authenticated-name')
  }

  //changes text back to sign in and image back to default image
  function updateSignIn(){
    authDataEl.textContent = 'Sign In';
    authDataImgEl.src = './images/FilePerson.png';
    authDataImgEl.classList.remove('authenticated-img');
    authDataEl.classList.remove('authenticated-name');
  }