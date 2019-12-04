'use strict';
const restify = require('restify');
const server = restify.createServer({name: "MyGymAssistant"});

const PORT = process.env.PORT || 8080;

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.jsonp());



server.post('/', (req,res,next)=>{
    let queryResult = req.body.queryResult;
    console.log(req.body);
    let fulfillmentText = queryResult.fulfillmentText;
    let outputContext = queryResult.outputContexts[0];

    let exerciseType = outputContext.parameters.nextExercise;

    

    let exercises = ['pushups', 'pullups', 'benchpress','legpress'];

    let found  = exercises.findIndex((exercise) => exercise == exerciseType);

    

    if(found == (exercises.length - 1)) {
        res.json({
            "fulfillmentText": "Okay, that's enough for today, get some rest!"
        });
    }
    else {
        outputContext.parameters.nextExercise = outputContext.parameters.exerciseType = exercises[found+1];
        res.json({
            "outputContexts": [outputContext],
            "fulfillmentText": fulfillmentText.replace('_exerciseType',exercises[found+1])
        });
    }

    return next();
});

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));