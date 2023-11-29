import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.Github_API
  })

export const getRepos = async (event) => {
  try {
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
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: repos }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export const getLanguages = async (event) => {
  try {
    const reservedWord =  await octokit.request('GET /repos/{username}/{repo}/languages', {
        username:'RawleJuglal',
        repo:event.name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: reservedWord.data }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

// module.exports =  { getRepos, getLanguages, getDependencies  }
