import express, {request} from "express";
import routes from "./routes.js"
import * as https from "https";
import * as fs from "fs";
import * as path from "path";


const app = express();

app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept');
  res.header('Access-Control-Allow-Methods','OPTIONS.GET,POST,PUT,DELETE');
  if ('OPTIONS'==req.method){
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }

});

app.use(express.json());

  https.get('https://dog.ceo/api/breeds/list/all', resp => {

    let data = "";

    resp.on('data', chunk => {
      data += chunk;
    })
    resp.on('end', () => {
      let dogBreeds= JSON.parse(data);
      console.log(dogBreeds["message"]);
      app.locals.dogBreeds = dogBreeds["message"];
    })
    //console.log(typeof (app.locals.dogBreeds));
  });


app.use('/',routes);
app.get('/dogBreeds', (req,res)=> {res.send(app.locals.dogBreeds); });
app.get('/high-scores', (req,res)=> {
  fs.readFile( path.join(path.resolve(), 'src/assets/scores.json'),'utf8',(err, data)=>{
    res.send(JSON.parse(data));})});

/*app.post('/test', (req,res)=> { res.send(JSON.stringify(req.body));
  console.log(`test ${JSON.stringify(req.body)}`);
  res.end();
});*/
//app.post('/', (req,res)=> {res.send(req.body);});

app.post('/game-end', (req,res)=> {
  let row = req.body;
  console.log(JSON.stringify(req.body));
  test_record(row, path.join(path.resolve(), 'src/assets/scores.json'));
  res.end();
});

function test_record(candidate, record_file){
  console.log(candidate.boardSize);
  fs.readFile(record_file,'utf8',(err, data) => {
    let high_scores = JSON.parse(data);

      let inserted = false;
      for (const record_index in high_scores[candidate.boardSize]) {
        if (high_scores[candidate.boardSize][record_index].score < candidate.score && !inserted) {
          console.log(`${high_scores[candidate.boardSize][record_index].score}  is smaller than ${candidate.score}`);
          high_scores[candidate.boardSize].splice(record_index, 0, candidate);
          high_scores[candidate.boardSize] = high_scores[candidate.boardSize].slice(0, 5);
          inserted = true;
        }
      }

      if (!inserted && high_scores[candidate.boardSize].length < 5){
        console.log(`high score board ${candidate.boardSize} is not full`);
        high_scores[candidate.boardSize][high_scores[candidate.boardSize].length] = candidate;
      }

    console.log(high_scores);
    fs.writeFile(record_file, JSON.stringify(high_scores), 'utf8', (err) => {console.log(err)});
  });
}

    /*let flag=false;
    let count=0;
    for (const line in split_data ) {
      console.log(`line ${line} -->> ${split_data[line]}`);
      let l=split_data[line];
      if (l.boardSize===candidate.boardSize){
        count++;
        if (count <= 5 && candidate.score > l.score) {
          flag=true;
        }
      }}*/


app.listen(4201,'127.0.0.1',function () {
  console.log('Server now listening on port 4201');
})


