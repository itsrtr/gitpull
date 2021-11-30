// const { GETRepositories } = require('./src/api/git')
const { default: axios } = require('axios')
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3003

app.use(cors({origin: 'http://localhost:3000'}));

const gitUserName = 'itsrtr';

const respositoryBody = JSON.stringify({
    query: `{
        user(login: \"${gitUserName}\") {
            repositories(last: 100) {
                totalCount
                nodes {
                    name
                }
            }
        }
    }`,
});

const commitCommentsBody = JSON.stringify({
    query: `{
        user(login: \"${gitUserName}\") {
            commitComments {
                totalCount
                
            }
        }
    }`,
});

const pullRequestsBody = JSON.stringify({
    query: `{
        user(login: \"${gitUserName}\") {
            pullRequests(last:100) {
                nodes {
                    additions
                  }
                  totalCount            
                
            }
        }
    }`,
});



// HTTP Request possibilities - Success or Failure
// Success - HTTP stattus code 200
// Failure - 400 (Bad Request) , 401(Unauthorized), 403(Forbidden), 500(Internal Error)
const GETRepositories = () => {
    return axios.post('https://api.github.com/graphql', respositoryBody)
    .then((response) => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

const GETcommits = () => {
    return axios.post('https://api.github.com/graphql', commitCommentsBody)
    .then((response) => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

const GETpullRequests = () => {
    return axios.post('https://api.github.com/graphql', pullRequestsBody)
    .then((response) => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}
axios.defaults.headers.common['Authorization'] = 'Bearer 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';

app.get('/repositories', async (req, res) => {
    // TO DO parameterize 
    const result = await GETRepositories();
    res.send(result);
});

app.get('/commits', async (req, res) => {
    // TO DO parameterize 
    const result = await GETcommits();
    res.send(result);
})

app.get('/pullrequests', async (req, res) => {
    // TO DO parameterize 
    const result = await GETpullRequests();
    res.send(result);
})

const start = () => {
    app.listen(port, () => {
        console.log(`Git app listening at http://localhost:${port}`)
    })
}

start();