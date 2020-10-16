let fs = require('fs');
 
module.exports.handleRequest = (request, response) => {
    response.writeHead(200);
    fs.readFile('./src/views/mypage.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('file not found');
        } else {
            response.write(data);
        }
        response.end();
    });
};