import { Octokit } from "octokit";
import { process } from './env'

const octokit = new Octokit({
    auth: process.env.Github_API
  })

const repos = await octokit.request('GET /users/{username}/repos', {
    username: 'RawleJuglal',
    per_page:100,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then(res => {
   return res.data.filter(ele => !ele.archived)
  })

async function getLanguages(ele){
    const reservedWord =  await octokit.request('GET /repos/{username}/{repo}/languages', {
        username:'RawleJuglal',
        repo:ele.name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return reservedWord.data
} 


//Not working for saving a screengrab image
// async function getScreenGrab(ele){
//     if(ele.name == 'ImOnIt'){
//         const imageEle = await octokit.request(`GET ${ele.downloads_url}`)
//         console.log(imageEle);
//         return imageEle
//     }
   
// }

async function getDependencies(ele){
    try {
        const dependecies = await fetch(`https://raw.githubusercontent.com/RawleJuglal/${ele.name}/master/package.json`)
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                return null;
            }
        })
        .then(data => {
            if(data){
                let currDep = [];
                if(data.dependencies){
                    currDep = [...Object.keys(data.dependencies)]
                }
                if(data.devDependencies){
                    currDep = [...currDep, ...Object.keys(data.devDependencies)]
                }
                return currDep;
            }
        })
        return dependecies;
    } catch (error) {
       console.log('im in the error')
    }
}

let usefulInformationArr = repos.map(async ele => {
    return {
        id:ele.id,
        name: ele.name,
        createdAt: ele.created_at,
        githubLocation:ele.html_url,
        languages: await getLanguages(ele),
        liveAt:ele.homepage,
        imageUrl: '',
        dependencies: await getDependencies(ele)
    }
})

const usefulInfo = async () => { 

    return await Promise.all(usefulInformationArr)
    
}

// usefulInfo().then(data => {
//     return data
// })

export { repos, usefulInfo, usefulInformationArr }