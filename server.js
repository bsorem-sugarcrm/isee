// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var codes = require('./codes.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/:country', function(req, res) {
    var code, country;

    if (req.param('country')){
        country = req.param('country').toLowerCase();

        for (var i = 0; i < codes.length; i++){
            var l = codes[i].name.toLowerCase();
            if (codes[i].name.toLowerCase() === country){
                code = codes[i].iso;
            }
        }
    }

    if (code) res.json({ code: code });
    else res.json({ error: 'Code not found' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, function(){
    console.log("Ready");
});