var fs = require('fs');
var bodyParser = require('body-parser')

const pokemonNames = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
  "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
  "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
  "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
  "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
  "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
  "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
  "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
  "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
  "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
  "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo",
  "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
  "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
  "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
  "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
  "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela",
  "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
  "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
  "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto",
  "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
  "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
  "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo",
  "Mew"
];

const path = require('path');

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const lowercasePokemonNames = pokemonNames.map(name => name.toLowerCase());
const uri = "mongodb+srv://npd5889:Thistester89@test0.v6w2nvp.mongodb.net/?retryWrites=true&w=majority&appName=Test0"
let pkRandNumber = 0;
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'+lowercasePokemonNames[pkRandNumber]+'/';
var data = fs.readFileSync('./db/data.json')
var pks = JSON.parse(data);
let myOutputText = "";

let pkName;
let pkType;
let pkFact;


var express = require('express');
const { writeFile } = require('fs/promises');
const { finished } = require('stream');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var server = app.listen(3000, listening);
//Schema
const newSch = {
  name: String,
  type1: String,
  type2: String,
  id: Number
}

const pkFacts = {
  name: String,
  type: String,
  fact: String,
  id: Number
}

const mongoModel = mongoose.model("NEWPK", newSch);
const mongoModel2 = mongoose.model("PKFACTS", pkFacts);
async function connect(){

    try{
        await mongoose.connect(uri);
        console.log("Connected to DB")
    } catch(err){
        console.log(err);
    }

}
//////////GETTING PK DATA FROM PKMON API

//PATHS

app.use(express.static('website'));

app.get("/", (req, res) => {
    res.sendFile( path.resolve("./website/index.html"))
  });

//POST
app.post("/post", async (req, res) => {
  //res.sendFile( path.resolve("./website/index.html"))
  console.log("POST DONE");

  const data =  new mongoModel({
    name: req.body.name,
    type1: req.body.type1,
    type2: req.body.type2,
    id: req.body.id
  })



  const val = await data.save();
  //res.json(val);

  res.sendFile( path.resolve("./website/posted.html"))
});

app.post("/postPk", async (req, res) => {
  //res.sendFile( path.resolve("./website/index.html"))

  console.log("POST DONE");
  

  const data =  new mongoModel2({
    name: req.body.name,
    type: req.body.type,
    fact: req.body.pkFact,
  })



  const val = await data.save();
  //res.json(val);

  res.sendFile( path.resolve("./website/posted.html"))
});

//GET
app.get("/get/:id", async (req, res) => {
  //res.sendFile( path.resolve("./website/index.html"))
  console.log("FETCH DONE");

});


connect();

function listening(){
    console.log("listening...")
}
console.log('server is running');



app.get('/add/:pk/:num', addPk);

app.get('/all', sendPk);

function sendPk( request, response){

    response.send(pks);
    console.log(pks.charizard)
}

app.get("/search/:pk", gotPk);

function gotPk(request, response){

    var pk = request.params.pk;
    var reply;

    if( pks[pk]){
        reply={
            status: "found",
            pk: pk,
            num: pks[pk]
        }
    } else{
        reply={
            status: "Not found",
            pk: pk,
        }
    }

    response.send(reply);

}

function addPk(request, response){

    var data = request.params;
    var num = Number(data.num);
    var pk = data.pk
    var reply;

    if(!num){
        reply = {
            msg: 'Score Is Required'
        }
    } else{

        pks[pk] = num;
        var data = JSON.stringify(pks)
        fs.writeFile('data.json', data, finished)


        function finished(err){
            console.log('Ready...');
        }

    response.send("Successfully added " + pk +  " to list.");
    console.log(data);

    }
    

}

////CRUD OPS

// ---- ADD YOUR API ENDPOINTS HERE ----
// GET: "api/v1/todos"
app.get("/api/v1/todos", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // POST: "api/v1/todos"
  app.post("/api/v1/todos", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // PUT: "api/v1/todos:id"
  app.put("/api/v1/todos/:id", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // DELETE: "api/v1/todos:id"
  app.delete("/api/v1/todos/:id", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
