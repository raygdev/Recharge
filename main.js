import './style.css'
/*libraries*/
import {DateTime} from 'luxon'
/*images*/
import AppBG from './src/images/app-bg.jpg'

const appEl = document.getElementById('app')
const timeDataEl = document.getElementById('time-data')

const weatherAccess = '9575f3355ae129dc91424b5712a7695e'
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

function renderBackground(){
  appEl.style.background = `url(${AppBG})`
  appEl.style.backgroundRepeat = 'no-repeat'
  appEl.style.backgroundSize = 'cover'
}

let myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)

function renderTime(elem){
  setInterval(()=>{
    myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
    elem.textContent = myValue;
  },60000)
  
}

function renderWeather(){
  navigator.geolocation.getCurrentPosition(position => {
    fetch(`${weatherUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${weatherAccess}`)
          .then(res=>{
              if(!res.ok){
                  throw Error('Weather data not available')
              }
              return res.json()
          })
          .then(data=>{
             console.log(data)
             //<img id="--weather-condition-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          })
          .catch(err=>{
              let defaultWeather = {
                  name:'Not Available',
                  weather:[
                      {icon:''}
                  ]
              }
          })
  })
}

renderBackground()
renderTime(timeDataEl)
renderWeather()