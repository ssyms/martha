const helpers = require('./helpers');
const apiAdapter = require('./api_adapter');

// This function counts on the request posing  data as "application/json" content-type.
// See: https://cloud.google.com/functions/docs/writing/http#parsing_http_requests for more details
function parseRequest(req) {
    if (req && req.body) {
        return req.body.url;
    }
}

function maybeTalkToBond(req) {
    let myPromise;
    if (req && req.headers && req.headers.authorization) {
        myPromise = apiAdapter.getJsonFrom(`${helpers.bondBaseUrl()}/api/link/v1/fence/serviceaccount/key`, req.headers.authorization);
    } else {
        myPromise = Promise.resolve();
    }
    return myPromise;
}

function aggregateResponses(responses) {
    const finalResult = { dos: responses[0] };
    if (responses[1]) {
        finalResult.googleServiceAccount = responses[1];
    }

    return finalResult;
}

function martha_v2_handler(req, res) {
    const origUrl = parseRequest(req);
    if (!origUrl) {
        res.status(400).send('Request must specify the URL of a DOS object');
        return;
    }

    let dosUrl;
    try {
        dosUrl = helpers.dosToHttps(origUrl);
    } catch (e) {
        console.error(e);
        res.status(400).send('The specified URL is invalid');
        return;
    }

    const dosPromise = apiAdapter.getJsonFrom(dosUrl);
    const bondPromise = maybeTalkToBond(req);

    return Promise.all([dosPromise, bondPromise])
        .then((rawResults) => {
            res.status(200).send(aggregateResponses(rawResults));
        })
        .catch((err) => {
            console.error(err);
            res.status(502).send(err);
        });
}

exports.martha_v2_handler = martha_v2_handler;
