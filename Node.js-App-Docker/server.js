var express = require("express");

var app = express();

app.use(express.static('pages'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/pages/css'));
app.use('/js', express.static(__dirname + '/pages/js'));
app.use('/images', express.static(__dirname + '/pages/img'));

var server = app.listen(9005, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});