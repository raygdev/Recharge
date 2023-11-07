import {nanoid} from 'nanoid';
import { usefulInformationArr } from './projects';

async function getLatestVersion(packageName){
    /*Getting latest version of package*/
    const versionNum = await fetch(`https://registry.npmjs.org/${packageName}/latest`)
        .then(res => res.json())
        .then(data => data.version)
    return versionNum;
}

async function fetchPopularity (skill){
    /*Getting the popularity*/
    let response = await fetch(` https://registry.npmjs.org/-/v1/search?text=${skill}`)
    let data = await response.json()
    let solution = await Math.ceil(data.objects[0].score.detail.popularity * 100)
    return solution.toString()
}

async function getNumOfProjects(skill){
    const projectEl = await usefulInformationArr;

}

let  skillsCollection = [
    {id:nanoid(),imgSrc:'nanoid.svg', name:'nanoid', navLinks:['All', 'Libraries'],  timeSpent:Date.now(), popularity: fetchPopularity('nanoid'), versionCtrl: getLatestVersion('nanoid'), numOfProjects:getNumOfProjects('nanoid')},
    {id:nanoid(),imgSrc:'fontawesome.svg', name:'fontawesome', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity: fetchPopularity('fontawesome'), versionCtrl:getLatestVersion('fontawesome'), numOfProjects:17},
    {id:nanoid(),imgSrc:'nodejs.svg', name:'nodejs', navLinks:['All',], timeSpent:Date.now(), popularity:'N/A', versionCtrl:'18.12.0', numOfProjects:17},
    {id:nanoid(),imgSrc:'bootstrap.svg', name:'bootstrap', navLinks:['All','Frameworks'], timeSpent:Date.now(), popularity: fetchPopularity('bootstrap'), versionCtrl:getLatestVersion('bootstrap'), numOfProjects:17},
    {id:nanoid(),imgSrc:'animateCSS.png', name:'animate css', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity:fetchPopularity('animate.css'), versionCtrl:getLatestVersion('animate.css'), numOfProjects:17},
    {id:nanoid(),imgSrc:'firebase.svg', name:'firebase', navLinks:['All',], timeSpent:Date.now(), popularity: fetchPopularity('firebase'), versionCtrl:getLatestVersion('firebase'), numOfProjects:17},
    {id:nanoid(),imgSrc:'iconscout.svg', name:'iconscout', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity:fetchPopularity('@iconscout/react-unicons'), versionCtrl:getLatestVersion('@iconscout/react-unicons'), numOfProjects:17},
    {id:nanoid(),imgSrc:'cssalt.svg', name:'css', navLinks:['All', 'Web Technologies'], timeSpent:Date.now(), popularity:'100', versionCtrl: 'CSS3', numOfProjects:17},
    {id:nanoid(),imgSrc:'ConfettiJS.svg', name:'ConfettiJS', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity:fetchPopularity('confetti-js'), versionCtrl:getLatestVersion('confetti-js'), numOfProjects:17},
    {id:nanoid(),imgSrc:'vite.svg', name:'vite', navLinks:['All',], timeSpent:Date.now(), popularity:fetchPopularity('vite'), versionCtrl:getLatestVersion('vite'), numOfProjects:17},
    {id:nanoid(),imgSrc:'html5.svg', name:'html5', navLinks:['All', 'Web Technologies'], timeSpent:Date.now(), popularity:'100', versionCtrl: 'html5', numOfProjects:17},
    {id:nanoid(),imgSrc:'javascript.svg', name:'javaScript', navLinks:['All', 'Web Technologies'], timeSpent:Date.now(), popularity:'**', versionCtrl: 'ECMAScript 2022', numOfProjects:17},
    {id:nanoid(),imgSrc:'reactjs.svg', name:'reactjs', navLinks:['All', 'Frameworks'], timeSpent:Date.now(), popularity:'81', timeSpent:Date.now(), popularity:fetchPopularity('react'), versionCtrl:  getLatestVersion('react'), numOfProjects:17},
    {id:nanoid(),imgSrc:'git.svg', name:'git', navLinks:['All', 'Frameworks'], timeSpent:Date.now(), popularity:fetchPopularity('git'), versionCtrl: getLatestVersion('git'), numOfProjects:17},
    {id:nanoid(),imgSrc:'figma.svg', name:'figma', navLinks:['All',], timeSpent:Date.now(), popularity:'63', versionCtrl: 'N/A', numOfProjects:17},
    {id:nanoid(),imgSrc:'jquery.svg', name:'jquery', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity: fetchPopularity('jquery'), versionCtrl: getLatestVersion('jquery'), numOfProjects:17},
    {id:nanoid(),imgSrc:'luxon.svg', name:'luxon', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity: fetchPopularity('luxon'), versionCtrl:  getLatestVersion('luxon'), numOfProjects:17},
    {id:nanoid(),imgSrc:'openai.svg', name:'openai', navLinks:['All', 'Frameworks'], timeSpent:Date.now(), popularity:fetchPopularity('openai'), versionCtrl:  getLatestVersion('openai'), numOfProjects:17},
    {id:nanoid(),imgSrc:'framer.svg', name:'framer', navLinks:['All', 'Libraries'], timeSpent:Date.now(), popularity:fetchPopularity('framer'), versionCtrl: getLatestVersion('framer'), numOfProjects:17},
    {id:nanoid(),imgSrc:'typescript.svg', name:'typescript', navLinks:['All', 'Frameworks'], timeSpent:Date.now(), popularity:fetchPopularity('typescript'), versionCtrl: getLatestVersion('typescript'), numOfProjects:17},
]

export { skillsCollection }