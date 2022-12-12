import { FastifyRequest, FastifyReply } from "fastify";
import { PokemonWithStats } from "models/PokemonWithStats";

async function fetch(url) {
  const https = require("https");
  return new Promise((resolve, reject) => {
    const keepAliveAgent = new https.Agent({ keepAlive: true });

    const request = https.get(url, {agent:keepAliveAgent, timeout: 1000 }, (res) => {
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
export async function getPokemonByName(request: FastifyRequest, reply: FastifyReply) {
  var name: string = request.params['name']

  reply.headers['Accept'] = 'application/json'

  var urlApiPokeman = `https://pokeapi.co/api/v2/pokemon`;

  var params = {}


  name !==""
      ? name.trim() != ''
      ? (params["name"] = name, urlApiPokeman = urlApiPokeman + '/', urlApiPokeman = urlApiPokeman + name)
      : (urlApiPokeman = urlApiPokeman + '?offset=20', urlApiPokeman = urlApiPokeman + "&limit=20")
      : (urlApiPokeman = urlApiPokeman + '?offset=20', urlApiPokeman = urlApiPokeman + "&limit=20")

console.log(urlApiPokeman)
  let response: any = ""

if(name===""){
response = await fetch(urlApiPokeman)
reply.send(response)
return reply
}
else {
  response = await fetch(urlApiPokeman)
  await  computeResponse(response,reply)
}
 
  
 
}



export const computeResponse = async (response: any, reply: FastifyReply) => {
 
  const resp = response as any
  const rep = reply as any
  const {name,height,weight,base_experience,id,sprites,species,stats}=resp
  let types = resp.types.map(type => type.type).map(type => { return type.url })
  
  let pokemonTypes = []

  await types.forEach(async element => {
      let res = await fetch(element)
      pokemonTypes.push(res)
      //if all types are fetched perform the logic
      if(pokemonTypes.length==types.length){

        console.log("finished fetching all types")
        if (pokemonTypes == undefined)
        throw pokemonTypes
    
        var stats = []
        let avg =0
        resp.stats.forEach(subelement => {
          stats.push(subelement.base_stat)
        
        });
          if (stats) {
            let avg = stats.reduce((a, b) => a + b) / stats.length
            let pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + id
            let sprite_img=sprites.other.home.front_default
            let statArr =[]
            resp.stats.forEach(subelement => {
              subelement.averageStat=avg
              statArr.push(subelement)
            
            });
            const pokemon=new PokemonWithStats(name,height,base_experience,base_experience,id,sprite_img,species,pokeUrl,statArr)
            console.log(pokemon)
            reply.send(pokemon)
            return reply
          } 

      }
    })

  
}

