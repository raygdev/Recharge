import { app, getData, addData } from './firebaseConfig'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth' 
import './style.css'
/*libraries*/
import {DateTime} from 'luxon'
/*images*/
import AppBG from './src/images/app-bg.jpg'

const appEl = document.getElementById('app')
const timeDataEl = document.getElementById('time-data')
const weatherIconEl = document.getElementById('weather-container')
const techNavEl = document.getElementById('tech-nav')
const authDataEl = document.getElementById('auth-data')
const authDataImgEl = document.getElementById('auth-img')
const filteredSkillsListEl = document.getElementById('filtered-skills-list')
const infoContainerEl = document.getElementById('info-container')

const packageName = 'react'
/*-- GITHUB REPO --*/
// fetch('https://api.github.com/users/RawleJuglal/repos')
//   .then(res => res.json())
//   .then(data => console.log(data[0]))

/*Getting the latest version*/
// fetch(`https://registry.npmjs.org/${packageName}/latest`)
// .then(res => res.json())
// .then(data => console.log(data))



//TEMPORARY ADD DATA
// const tempAddEl = document.getElementById('temp-add') 

// const tempAddData = ()=>{
//   addData('projects', {})
// }
// tempAddEl.addEventListener('click', tempAddData)

const skillsArr = await getData('skills')

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
const auth = getAuth()
const googleProvider = new GoogleAuthProvider();
let currentUser = ''

const handleGoogle = (e)=>{
  e.preventDefault()
  signInWithPopup(auth, googleProvider)
    .then((results)=>{
      const credential = GoogleAuthProvider.credentialFromResult(results);
      const token = credential.accessToken;
      const authenticated = {credToken:token, user: results.user};
      currentUser = authenticated;
      updateUser()
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

authDataEl.addEventListener('click', handleGoogle)

const updateUser = ()=>{
  authDataEl.textContent = currentUser.user.displayName;
  authDataImgEl.src = currentUser.user.photoURL;
  authDataImgEl.classList.add('authenticated-img')
  authDataEl.classList.add('authenticated-name')
}

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
  determineSkillsContainer()
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
  determineSkillsContainer()
}

function determineSkillsContainer(){
  const techNavToDisplay = document.querySelectorAll('.--tech-nav-link.selected')
  const selectedSkillsArr = sortSkills(techNavToDisplay[0].textContent)
  renderSkillsContainer(selectedSkillsArr)
}

function sortSkills(text){
 return  skillsArr.filter(ele => {
    return ele.navLinks.includes(text)
  })
}

function renderSkillsContainer(techNavSelected){
  let skillsInnerHTML = techNavSelected.map(item => {
    return `<li data-name="${item.name}" id="${item.name}-li-item" class="--skill-list-item"><img src="./src/images/${item.imgSrc}" alt="${item.name} icon"></li>`
  }).join('')
  filteredSkillsListEl.innerHTML = skillsInnerHTML
  skillListener()
}

function skillListener(){
  document.querySelectorAll('.--skill-list-item').forEach(item => {
    item.addEventListener('mouseenter', buildInfoContainer)
  })
}

async function buildInfoContainer(event){
  infoContainerEl.innerHTML = '';
  const selectedSkill = event.target.dataset.name;
  const popularity = await fetchPopularity(selectedSkill);
  infoContainerEl.append(buildSingleElement({ele:'h1', id:'info-title', classes:['--info-title', 'XXXIIPT', 'thick-stroke'], text:'SKLZ'}))
  infoContainerEl.append(buildSingleElement({ele:'div', id:'', classes:['--info-grid-b'], text:''}))
  let infoGridBEl = document.getElementsByClassName('--info-grid-b')[0]
  infoGridBEl.append(buildSingleElement({ele:'img', id:'info-icon', source:selectedSkill == 'animate css' ? 'animateCSS' : selectedSkill, name:selectedSkill}))
  infoGridBEl.append(buildSingleElement({ele:'h2', id:'info-skill-name', classes:['--info-skill-name', 'XXXIIPT', 'thick-stroke'], text:selectedSkill}))
  infoContainerEl.append(buildSingleElement({ele:'h2', classes:['time', 'grid-center-item'], text:'Time Spent'}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['count', 'grid-center-item'], text:'04M28D'}))
  infoContainerEl.append(buildSingleElement({ele:'h2', classes:['pop', 'grid-center-item'], text:'Popularity'}))
  infoContainerEl.append(buildSingleElement({ele:'p', id:'percentage', classes:['percentage', 'grid-center-item'], text:popularity}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['use', 'grid-center-item'], text:'devs use'}))
  infoContainerEl.append(buildSingleElement({ele:'h2', classes:['version', 'grid-center-item'], text:'Version'}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['iteration', 'grid-center-item'], text:'18.2.0'}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['status', 'grid-center-item'], text:'Stable'}))
  infoContainerEl.append(buildSingleElement({ele:'h2', classes:['projects', 'grid-center-item'], text:'# of Projects'}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['number', 'grid-center-item'], text:'17'}))
  infoContainerEl.append(buildSingleElement({ele:'p', classes:['production', 'grid-center-item'], text:'In Production'}))
  infoContainerEl.append(buildSingleElement({ele:'button', classes:['--info-caret', 'grid-center-item'], text:'caret'}))
}

async function fetchPopularity (skill){
/*Getting the popularity*/
let response = await fetch(` https://registry.npmjs.org/-/v1/search?text=${skill}`)
let data = await response.json()
let solution = await Math.ceil(data.objects[0].score.detail.popularity * 100)
return solution.toString()
}

function buildSingleElement(fullElement){
  const {ele, id, classes, text, source, name,  } = {...fullElement}
  let newElement = document.createElement(ele);
  source == 'animateCSS' ? (newElement.src = `./src/images/${source}.png`) : (newElement.src = `./src/images/${source}.svg`);
  name && (newElement.alt = name)
  id && (newElement.id = id);
  classes && (newElement.classList.add(...classes))
  id=='percentage' && text ? (newElement.textContent = `${text.toUpperCase()}%`) : text && (newElement.textContent = text.toUpperCase());
  return newElement
}

/* SKLZ INFO COMPONENT */



renderBackground()
renderTime(timeDataEl)
renderWeather()
renderTechNavLinks()