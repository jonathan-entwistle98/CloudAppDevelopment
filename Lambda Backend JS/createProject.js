var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "project";
    var datetime = new Date().getTime().toString();
    
    dynamodb.putItem({
            "TableName": tableName,
            "Item": {
                "name": {
                    "S": event.name
                },
                "leader": {
                    "S": event.leader
                },
                "description": {
                    "S": event.description
                },
                "status": {
                    "S": event.status
                },
                "timedate": {
                    "N": datetime
                }
            }
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('SUCCESS');
            }
        });
}