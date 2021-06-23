const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();
require('isomorphic-fetch');

const locationOfResults = './results'
let leetCodeData;

async function checkLeetCode(userName) {
    leetCodeData = {};
    await fetch("https://leetcode.com/graphql", {
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "content-type": "application/json"
        },
        "referrer": `https://leetcode.com/${userName}/`,
        "body": `{\"operationName\":\"getUserProfile\",\"variables\":{\"username\":\"${userName}\"},\"query\":\"query getUserProfile($username: String!) {\\n  allQuestionsCount {\\n    difficulty\\n    count\\n }\\n  matchedUser(username: $username) {\\n    username\\n      githubUrl\\n    contributions {\\n      points\\n }\\n    profile {\\n  starRating\\n   reputation\\n      ranking\\n }\\n        submitStats {\\n      acSubmissionNum {\\n        difficulty\\n        count\\n        submissions\\n        __typename\\n      }\\n      totalSubmissionNum {\\n        difficulty\\n        count\\n        submissions\\n }\\n }\\n  \\n  \\n  \\n }\\n}\\n\"}`,
        "method": "POST",
        "mode": "cors"
    }).then(res => res.json())
        .then(res => {

            const questionData = res.data.allQuestionsCount;
            const userData = res.data.matchedUser;
            const solvedData = userData.submitStats.acSubmissionNum;

            leetCodeData['allQuestionsCount'] = questionData[0].count;
            leetCodeData['easyQuestionsCount'] = questionData[1].count;
            leetCodeData['mediumQuestionsCount'] = questionData[2].count;
            leetCodeData['hardQuestionsCount'] = questionData[3].count;

            leetCodeData['userName'] = userData.username;
            leetCodeData['userGithub'] = userData.githubUrl;
            leetCodeData['userPoints'] = userData.contributions.points;
            leetCodeData['userStarRating'] = userData.profile.starRating;
            leetCodeData['userReputation'] = userData.profile.reputation;
            leetCodeData['userRanking'] = userData.profile.ranking;

            leetCodeData['totalQuestionsSolved'] = solvedData[0].count;
            leetCodeData['totalQuestionsSubmitted'] = solvedData[0].submissions;

            leetCodeData['easyQuestionsSolved'] = solvedData[1].count;
            leetCodeData['easyQuestionsSubmitted'] = solvedData[1].submissions;

            leetCodeData['mediumQuestionsSolved'] = solvedData[2].count;
            leetCodeData['mediumQuestionsSubmitted'] = solvedData[2].submissions;

            leetCodeData['hardQuestionsSolved'] = solvedData[3].count;
            leetCodeData['hardQuestionsSubmitted'] = solvedData[3].submissions;

            prepareDirectory(locationOfResults, leetCodeData)
            updateFiles(leetCodeData);
        });
}


function updateFiles(data) {
    Object.keys(data).forEach(function (key) {
        //check to see if txt files already exist (if not, make them)
        let filePath = path.join(locationOfResults, key + ".txt");
        let contentsOfFile = fs.readFileSync(filePath, 'utf-8');

        if (!contentsOfFile || contentsOfFile !== String(data[key])) {
            fs.writeFileSync(filePath, String(data[key]));
        }
    });
}


async function prepareDirectory(location, data) {
    if (!await fs.existsSync(location)) {
        await fs.mkdirSync(location);
    }

    await Object.keys(data).forEach(function (key) {
        let file = path.join(location, key + ".txt");
        if (!fs.existsSync(file)) {
            fs.openSync(file, 'w');
        }
    });
}

async function destroyDirectory(location) {
    await fs.rm(path.join('./', location), {recursive: true});
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


async function exitHandler() {
    try {
        if (await fs.existsSync(locationOfResults)) {
            await destroyDirectory(path.join('.',locationOfResults), {recursive: true});
            // process.exit(23);
        }
    } catch (e) {
        console.error('EXIT HANDLER ERROR', e);
    }
}



[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, exitHandler);
});


async function main(userName) {

    checkLeetCode(userName);
    prepareDirectory(locationOfResults, leetCodeData);

    while (true) {
        checkLeetCode(userName);
        await delay(20000)
    }
}

if (require.main === module) {
    let userName = process.argv[2];

    if (!userName) {
        userName = prompt("Enter the LeetCode username to monitor:")
    }

    console.log(`Monitoring ${userName}'s LeetCode profile for updates.`);
    main(userName);
}


