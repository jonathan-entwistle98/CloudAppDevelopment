var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

exports.handler = function(event, context, callback){
    
    var scanningParameters = {
        TableName: 'project',
        Limit: 100
    }

    docClient.scan(scanningParameters, function(err, data){
       if(err){
           callback(null, err);
       }else{
           callback(null, {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": JSON.stringify(data), "isBase64Encoded": false});
        }
    });
    
}