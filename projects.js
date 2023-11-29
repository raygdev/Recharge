import { getRepos , getLanguages } from './netlify/functions/fetchGithubAPI/fetchGithubAPI'
// import { Octokit } from "octokit";

// const octokit = new Octokit({
//     auth: process.env.Github_API
//   })

// const repos = await octokit.request('GET /users/{username}/repos', {
//     username: 'RawleJuglal',
//     per_page:100,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
//   .then(res => {
//    return res.data.filter(ele => !ele.archived)
//   })


const repos = await getRepos()

// async function getLanguages(ele){
//     const reservedWord =  await octokit.request('GET /repos/{username}/{repo}/languages', {
//         username:'RawleJuglal',
//         repo:ele.name,
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//     })
//     return reservedWord.data
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
        console.log(dependecies)
        return dependecies;
    } catch (error) {
       console.log('im in the error')
    }
}

function decodeName(codedName){
    return codedName.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}



const usefulInfo = async () => { 
    const info = JSON.parse(repos.body);
    
    let usefulInformationArr = info.reply.map(async ele => {
        const unparsedLang = await getLanguages(ele);
        const parsedLang = JSON.parse(unparsedLang.body)
        return {
            id:ele.id,
            name: decodeName(ele.name),
            createdAt: ele.created_at,
            githubLocation:ele.html_url,
            languages: parsedLang.reply,
            liveAt:ele.homepage,
            imageUrl: `https://raw.githubusercontent.com/RawleJuglal/${ele.name}/master/src/assets/screengrab/screengrab.png`,
            dependencies: await getDependencies(ele)
        }
    })
    return usefulInformationArr
    
}

export { repos, usefulInfo }