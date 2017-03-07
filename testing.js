
var accessToken = '192611039.e81962f.bc5e74c91e7641c1982587cfb390f218';


var InstagramAPI = require('instagram-api');
var client = new InstagramAPI(accessToken);


console.log(client);

client.userSelf().then(function(result) {
	console.log("USERSELF")
	console.log(result);

}, function(err){
	console.log(err); // error info
});
