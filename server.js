var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var port = 3000;

var config = {
  database: 'week3task',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool(config);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, function(){
  console.log('server listening on: ', port);
}); // end server up

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});//end bas url

app.post('/addTask', function(req, res){
  console.log('/addTask hit', req.body);

  pool.connect(function(err, connection, done){
    if(err){
      console.log('error: ', err);
      done();
      res.send(400);

    } else {
      console.log('add connected db');
      connection.query("INSERT INTO task_table (task, completed) VALUES ($1, $2)", [req.body.task, false]);
      done();
    }
  });//end connect
  res.send( 'nice' );
});//end post

app.get('/getTask', function(req, res){
  console.log('/get task hit');

  pool.connect(function(err, connection, done){
    if(err){
      console.log('error', err);
      done();
      res.send(400);

    } else {

      console.log('posted to db');
      var sendBackData = [];
      var tableData = connection.query("SELECT * FROM task_table ORDER BY user_id ASC")
      tableData.on('row', function(row){
        sendBackData.push(row);
      });//end tableData
      tableData.on('end', function(){
        done();
        res.send(sendBackData);
      })
    };//end else

  })//end connect
})//end get

app.post('/deleteFromDatabase', function(req, res){
  console.log('/deleteFromDatabase hit', req.body);
  var id = req.body.idToSend;

  pool.connect(function(err, connection, done){
    if(err){
      console.log('error: ', err);
      done();
      res.send(400);
    } else {
      console.log('delet connected to db');
      connection.query("DELETE from task_table WHERE user_id = " + id);
      done();
    }
  });//end connect
  res.send('cool');
});//end post

app.post('/updateCompletion', function(req, res){
  console.log('/updateCompletion hit', req.body);

  var id = req.body.idToSend;
  pool.connect(function(err, connection, done){
    if(err){
      console.log('error:', err);
      done();
      res.send(400);
    } else {
      console.log(' update connected to db ');
      connection.query("UPDATE task_table set completed = true WHERE user_id = " + id);
      done();
    }
  });//end connect
  res.send('hell yeah');
});//end post












//spacer
