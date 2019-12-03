'use strict';
const restify = require('restify');
const server = restify.createServer({name: "MyGymAssistant"});

const PORT = process.env.PORT || 5001;

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.jsonp());

server.post('/', (req, res, next)=> {
    console.log(req.body);
    return next();
});
server.listen(PORT, () => console.log(`Server is listening on port: ${PORT} `));