

var http = require('http');
var url = require('url');
var fileSystem = require('fs');

//create the server and set the variables needed
http.createServer(function (request, response) { 
    var path = url.parse(request.url).pathname;
    var fileName = path.substr(1); 
// read the fileName and return the right data accordingly 

//if the filename is index then load the index page
    if (fileName  === 'index' ) { 
        //adds .html to the end to send to page
        fileName += '.html';
        fileSystem.readFile(fileName , getHTML);
    } 
    // if the fileName is todo then get the todo.json file
    else if (fileName  === 'todo' ) {
        //adds .json to the end of url to send to json object
        fileName += '.json';
        fileSystem.readFile(fileName, getJSON);
    }
    //function that gets the JSON Object
    function getJSON(error, data){
        if(error){
            //if there was an error getting the json file then display the error page
            response.writeHead(400, {'Content-Type': 'text/html'});
            response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
        }else{
            //else display the json object on the page
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(data.toString());
        }
        response.end();   
    }
    
    //function that gets the HTML Object
    function getHTML(error, data){
        if(error){
            //if there was an error getting the html page then display error page
            response.writeHead(400, {'Content-Type': 'text/html'});
            response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
        }else{
            // else display the page
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    }
    
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index');