let fs = require('fs');
 
module.exports.handleRequest = (request, response) => {
    response.writeHead(200);
    var htmlString = "";
    fs.readFile('./src/views/mypage.ejs', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('file not found');
        } else {
            response.write(data);
        }
        response.end();
    });
};