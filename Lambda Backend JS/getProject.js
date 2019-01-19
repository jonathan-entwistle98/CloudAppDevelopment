var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context, callback){
  
      var scanningParameters = {
      TableName: "project",
      Key: {
        "name" : {
            "S": event.name
        }
      }
    //   ProjectionExpression: 'description'
    };

    dynamodb.getItem(scanningParameters, function(err, data){
       if(err){
           callback(null, err);
       }else{
           console.log("event name is "+ event.name);
           callback(null, {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": JSON.stringify(data), "isBase64Encoded": false});
        }
    });
    
}