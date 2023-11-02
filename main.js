import './style.css'
/*libraries*/
import { renderTime, renderWeather, handleGoogle } from './components/header'
import { Octokit, App } from "octokit";
/*images*/
import AppBG from './src/images/app-bg.jpg'
/* internal files */
import skillsCollection from './skills'
import { process } from './token';

const appEl = document.getElementById('app')
const timeDataEl = document.getElementById('time-data')
const weatherIconEl = document.getElementById('weather-container')
const techNavEl = document.getElementById('tech-nav')
const authDataLinkEl = document.getElementById('auth-link')
const filteredSkillsListEl = document.getElementById('filtered-skills-list')
const infoContainerEl = document.getElementById('info-container')

/*-- GITHUB REPO --*/
// fetch('https://api.github.com/users/RawleJuglal/repos')
//   .then(res => res.json())
//   .then(data => console.log(data))

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

const skillsArr = skillsCollection;
const octokit = new Octokit({
  auth:process.env.Github_API
})
let isHovering = false;
let timeout;

await octokit.request("GET /repos/{owner}/{repo}/tags", {
  owner: 'RawleJuglal',
  repo:'glampers'
}).then(res => console.log(res))

function renderBackground(){
  appEl.style.background = `url(${AppBG})`
  appEl.style.backgroundRepeat = 'no-repeat'
  appEl.style.backgroundSize = 'cover'
}

/* --TIME COMPONENT -- */
renderTime(timeDataEl)

/* --WEATHER COMPONENT-- */
renderWeather(weatherIconEl)

/* --SIGN IN-- */
authDataLinkEl.addEventListener('click', handleGoogle)


/* --TECH NAV COMPONENT--*/
const navList = ['All', 'Web Technologies', 'Frameworks', 'Libraries']

function renderTechNavLinks(){
  //create a ul element with classes --tech-nav-ul
  const techNavUL = document.createElement('ul');
  techNavUL.classList.add('--tech-nav-ul', 'flex', 'flex-wrap')

  //map navList to create Links for each index, 1st link with class selected
  const techNavList = navList.map((ele, i) => {
    return i==0 ? `<a class='--tech-nav-link selected'><li>${ele}</li></a>` : `<a class='--tech-nav-link'><li>${ele}</li></a>`
  }).join('');
  //append these links to the UL
  techNavUL.innerHTML = techNavList;
  //put the UL in the <nav id='tech-nav'>
  techNavEl.appendChild(techNavUL);
  addTechNavListener()
  determineSkillsContainer()
}

function addTechNavListener(){
  //gets all the --tech-nav-link (All, Web Technologies,Frameworks, Libraries) and adds a mouseenter changeTechNavSelected function
  document.querySelectorAll('.--tech-nav-link').forEach(item => {
    item.addEventListener('mouseenter', changeTechNavSelected)
  })
}

function changeTechNavSelected(e){
  //when mouseenters any --tech-nav-link
  document.querySelectorAll('.--tech-nav-link').forEach(item =>{
    //we remove the class selected from all of them
    item.classList.remove('selected')
  })
  //then the target link has the selected added back
  e.target.classList.add('selected')
  //then we determine what skills should be shown (the boxes with logos)
  determineSkillsContainer()
}

function determineSkillsContainer(){
  //finds the one NavLink selected
  const techNavToDisplay = document.querySelectorAll('.--tech-nav-link.selected')
  //gets the name of the skill and passes it to the sortSkills function 
  //which returns an Arr of Objects (only the skills that match the navLink)
  const selectedSkillsArr = sortSkills(techNavToDisplay[0].textContent)
  //This array is passed to the renderskills to show the skills (grey box logos)
  renderSkillsContainer(selectedSkillsArr)
}

function sortSkills(text){
  //filters through the area getting only the objects that have name of techNav link included in their navLinks array
  /* EXAMPLE
                                                              VV
    {id:nanoid(),imgSrc:'bootstrap.svg', name:'bootstrap', navLinks:['All','Frameworks']}

  */
 return  skillsArr.filter(ele => {
    return ele.navLinks.includes(text)
  })
}

function renderSkillsContainer(techNavSelected){
  //techNavSelected is the array of Objects that matches the navLink selected
  let skillsInnerHTML = techNavSelected.map(item => {
    //a list item with the name,id,class and an image is returned and added to skillsInnerHTML
    return `<li data-name="${item.name}" id="${item.name}-li-item" class="--skill-list-item"><img src="./images/${item.imgSrc}" alt="${item.name} icon"></li>`
  }).join('')
  //The multiple li elements are then placed into the <ul id="filtered-skills-list">
  filteredSkillsListEl.innerHTML = skillsInnerHTML
  //then we call skillsListener to add event handler 'mouseenter' to each <li class="--skill-list-item">
  addMouseEnterSkillListener()
  addMouseLeaveSkillListener()
}

function addMouseEnterSkillListener(){
  //add mouseenter to all <li class='--skill-list-items> to call buildInfoContainer function
  document.querySelectorAll('.--skill-list-item').forEach(item => {
    item.addEventListener('mouseenter', buildInfoContainer)
  })
}

function addMouseLeaveSkillListener(){
  document.querySelectorAll('.--skill-list-item').forEach(item => {
    item.addEventListener('mouseleave', checkForCompleted)
  })
}

async function buildInfoContainer(event){
      isHovering = true;
      timeout = setTimeout(async ()=>{
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
      }, 1000)
       
}

function checkForCompleted(){
  if(!timeout) return;
  clearTimeout(timeout);
  timeout = null;
  isHovering = false;
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
  source == 'animateCSS' ? (newElement.src = `./images/${source}.png`) : (newElement.src = `./images/${source}.svg`);
  name && (newElement.alt = name)
  id && (newElement.id = id);
  classes && (newElement.classList.add(...classes))
  id=='percentage' && text ? (newElement.textContent = `${text.toUpperCase()}%`) : text && (newElement.textContent = text.toUpperCase());
  return newElement
}

/* SKLZ INFO COMPONENT */



renderBackground()


renderTechNavLinks()