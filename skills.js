import {nanoid} from 'nanoid';

/*Getting the latest version*/
// fetch(`https://registry.npmjs.org/${packageName}/latest`)
// .then(res => res.json())
// .then(data => console.log(data))
async function getLatestVersion(packageName){
    const versionNum = await fetch(`https://registry.npmjs.org/${packageName}/latest`)
        .then(res => res.json())
        .then(data => data.version)
    return versionNum;
}

let  skillsCollection = [
    {id:nanoid(),imgSrc:'nanoid.svg', name:'nanoid', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('nanoid')},
    {id:nanoid(),imgSrc:'fontawesome.svg', name:'fontawesome', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('fontawesome')},
    {id:nanoid(),imgSrc:'nodejs.svg', name:'nodejs', navLinks:['All',], versionCtrl: getLatestVersion('placeholder')},
    {id:nanoid(),imgSrc:'bootstrap.svg', name:'bootstrap', navLinks:['All','Frameworks'], versionCtrl: getLatestVersion('bootstrap')},
    {id:nanoid(),imgSrc:'animateCSS.png', name:'animate css', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('animate.css')},
    {id:nanoid(),imgSrc:'firebase.svg', name:'firebase', navLinks:['All',], versionCtrl: getLatestVersion('firebase')},
    {id:nanoid(),imgSrc:'iconscout.svg', name:'iconscout', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('@iconscout/react-unicons')},
    {id:nanoid(),imgSrc:'cssalt.svg', name:'css', navLinks:['All', 'Web Technologies'], versionCtrl: 'CSS3'},
    {id:nanoid(),imgSrc:'ConfettiJS.svg', name:'ConfettiJS', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('confetti-js')},
    {id:nanoid(),imgSrc:'vite.svg', name:'vite', navLinks:['All',], versionCtrl: getLatestVersion('vite')},
    {id:nanoid(),imgSrc:'html5.svg', name:'html5', navLinks:['All', 'Web Technologies'], versionCtrl: 'html5'},
    {id:nanoid(),imgSrc:'javascript.svg', name:'javaScript', navLinks:['All', 'Web Technologies'], versionCtrl: 'ECMAScript '},
    {id:nanoid(),imgSrc:'reactjs.svg', name:'reactjs', navLinks:['All', 'Frameworks'], versionCtrl: getLatestVersion('react')},
    {id:nanoid(),imgSrc:'git.svg', name:'git', navLinks:['All', 'Frameworks'], versionCtrl: getLatestVersion('git')},
    {id:nanoid(),imgSrc:'figma.svg', name:'figma', navLinks:['All',], versionCtrl: 'N/A'},
    {id:nanoid(),imgSrc:'jquery.svg', name:'jquery', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('jquery')},
    {id:nanoid(),imgSrc:'luxon.svg', name:'luxon', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('luxon')},
    {id:nanoid(),imgSrc:'openai.svg', name:'openai', navLinks:['All', 'Frameworks'], versionCtrl: getLatestVersion('openai')},
    {id:nanoid(),imgSrc:'framer.svg', name:'framer', navLinks:['All', 'Libraries'], versionCtrl: getLatestVersion('framer')},
    {id:nanoid(),imgSrc:'typescript.svg', name:'typescript', navLinks:['All', 'Frameworks'], versionCtrl: getLatestVersion('typescript')},
]

export { skillsCollection }