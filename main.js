import './style.css'
/*libraries*/
import {DateTime} from 'luxon'
/*images*/
import AppBG from './src/images/app-bg.jpg'

const appEl = document.getElementById('app')
const timeDataEl = document.getElementById('time-data')
const weatherIconEl = document.getElementById('weather-container')
const techNavEl = document.getElementById('tech-nav')

function renderBackground(){
  appEl.style.background = `url(${AppBG})`
  appEl.style.backgroundRepeat = 'no-repeat'
  appEl.style.backgroundSize = 'cover'
}

/* --TIME COMPONENT -- */
let myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)

function renderTime(elem){
  elem.textContent = myValue;
  setInterval(()=>{
    myValue = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
    elem.textContent = myValue;
  },60000)
  
}

/* --WEATHER COMPONENT-- */
const weatherAccess = '9575f3355ae129dc91424b5712a7695e'
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

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
            //  console.log(data)
             let img = document.createElement('img')
             img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
             img.id = '--weather-condition-icon'
             img.classList.add('icon')

             weatherIconEl.appendChild(img)
          })
          .catch(err=>{
              weatherIconEl.remove()
          })
  })
}

/* --SIGN IN-- */

/* --TECH NAV COMPONENT--*/
const navList = ['All', 'Web Technologies', 'Frameworks', 'Libraries']

function renderTechNavLinks(){
  const techNavUL = document.createElement('ul');
  techNavUL.classList.add('--tech-nav-ul', 'flex', 'flex-wrap')

  const techNavList = navList.map((ele, i) => {
    return i==0 ? `<a class='--tech-nav-link selected'><li>${ele}</li></a>` : `<a class='--tech-nav-link'><li>${ele}</li></a>`
  }).join('');
  techNavUL.innerHTML = techNavList;
  techNavEl.appendChild(techNavUL);
  addTechNavListener()
}

function addTechNavListener(){
  document.querySelectorAll('.--tech-nav-link').forEach(item => {
    item.addEventListener('mouseenter', changeTechNavSelected)
  })
}

function changeTechNavSelected(e){
  document.querySelectorAll('.--tech-nav-link').forEach(item =>{
    item.classList.remove('selected')
  })
  e.target.classList.add('selected')
}

renderBackground()
renderTime(timeDataEl)
renderWeather()
renderTechNavLinks()