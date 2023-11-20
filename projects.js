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

async function getScreenGrab(ele){
    const screengrabData = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'RawleJuglal',
        repo: ele.name,
        //specify the file path that you want the content of
        path: 'src/assets/screengrab/screengrab.png',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          //set the accept header for raw content
          //similar to the url for the quick solution
          //otherwise it is base64 encoded and requires a little
          //more code
        //   'accept': 'application/vnd.github.raw'
        }
      })
      .then(response => {
          //response.data is going to be the stringified json...
          //we need to parse it to turn into an object
            return response
        })
       console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(screengrabData.data))))  
    return btoa(String.fromCharCode.apply(null, new Uint8Array(screengrabData.data)));
}

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
                const figmaDesigns = [
                    'reactstatic', 
                    'digitalbusinesscard',
                    'airbnbclone',
                    'traveljournal',
                    'memegenerator', 
                    'tenzies',
                    'quizzical',
                    'moviewatchlist',
                    'scoreboard',
                    'passwordgenerator',
                    'unitconverter',
                    'oldagram',
                    'restaurant',
                    'hotspots',
                    'Learningjournal',
                    'homereadyrenovations',
                    'pollyglot',
                ]

                let currDep = [];
                if(data.dependencies){
                    currDep = [...Object.keys(data.dependencies)]
                }
                if(data.devDependencies){
                    currDep = [...currDep, ...Object.keys(data.devDependencies)]
                }
                currDep = [...currDep, 'html5', 'css', 'javascript', 'git']
                if(figmaDesigns.includes(data.name)){
                    currDep = [...currDep, 'figma']
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
        imageUrl: await getScreenGrab(ele),
        dependencies: await getDependencies(ele)
    }
})

const usefulInfo = async () => { 

    return await Promise.all(usefulInformationArr)
    
}

export { repos, usefulInfo, usefulInformationArr }