import { Octokit } from "octokit";
import { process } from './token'

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

const usefulInformationArr = repos.map(ele => {
    return {
        id:ele.id,
        name: ele.name,
        createdAt: ele.created_at,
        githubLocation:ele.html_url,
        languages: getLanguages(ele),
        liveAt:ele.homepage,
        imageUrl: getScreenGrab(ele)
    }
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
    const imageEle = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner:'RawleJuglal',
        repo:ele.name,
        path:'/src/assets/screengrab/screengrab.png',
    })
    console.log(atob(imageEle.data.content))
    return atob(imageEle.data.content)
}





export { repos }