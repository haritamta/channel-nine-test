var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var port = process.env.PORT || 8080;


app.listen(port);
console.log('Server started! At http://localhost:' + port);

app.use((err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data');
        res.status(400);
        res.send({error : "Could not decode request: JSON parsing failed"});
    } else {
        next()
    }
});

app.post('', function(req, res) {
  var filteredPayload = [];
  const payload = req.body.payload;
  let outObj = {};
  payload.forEach(element => {
    console.log(JSON.stringify(element.image));
    if (element.drm && element.episodeCount > 0) {
      outObj.image = element.image.showImage;
      outObj.slug = element.slug;
      outObj.title = element.title;
      filteredPayload.push(outObj);
    }
    outObj = {};
    console.log(JSON.stringify(filteredPayload));
    
  });
  res.send({response : filteredPayload});
});