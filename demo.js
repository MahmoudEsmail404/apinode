// const https = require("https");
// const HttpsAgent = require("agentkeepalive").HttpsAgent;

// const keepaliveAgent = new HttpsAgent();
// // https://www.google.com/search?q=nodejs&sugexp=chrome,mod=12&sourceid=chrome&ie=UTF-8
// const options = {
//   host: "www.pokeapi.co",
//   port: 443,
//   path: "/api/v2/pokemon/bulbasaur",
//   method: "GET",
//   agent: keepaliveAgent,
// };

// const req = https.request(options, (res) => {
//   console.log("STATUS: " + res.statusCode);
//   console.log("HEADERS: " + JSON.stringify(res.headers));
//   res.setEncoding("utf8");
//   res.on("data", (chunk) => {
//     console.log("BODY: " + chunk);
//   });
// });

// req.on("error", (e) => {
//   console.log("problem with request: " + e.message);
// });
// req.end();

// setTimeout(() => {
//   console.log("agent status: %j", keepaliveAgent.getCurrentStatus());
// }, 2000);

temp = [
  "https://pokeapi.co/api/v2/type/12/",
  "https://pokeapi.co/api/v2/type/4/",
];
types = [];
types = temp.reduce((types, typeUrl) => console.log(types));

const https = require("https");

async function fetch(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 1000 }, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        const res = JSON.parse(resString);
        resolve(res);
      });
    });

    request.on("error", (err) => {
      reject(err);
    });
    request.on("timeout", () => {
      request.destroy();
      reject(new Error("timed out"));
    });
  });
}

const tryme = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon-form/1/");
  console.log(res);
  console.log("hiiiiiiiiiii");
};

tryme();
