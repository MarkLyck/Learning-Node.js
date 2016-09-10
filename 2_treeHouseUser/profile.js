//Problem: We need a simple way to look at a user's badge count and Javascript points.
// Solution: Use Node.js to connect o TreeHouse's API to get profile information to print out.

var https = require('https')
var http = require('http')

var username = 'chalkers'


// Prints out message
function printMessage(username, badgeCount, points) {
  var message = username + 'has ' + badgeCount + ' total badges and ' + points + ' points in JavaScript';
  console.log(message);
}

// Prints out error messages
function printError(e) {
  console.error(e.message);
}

function get(username) {
  // Connect to the API URL (https://teamtreehouse.com/username.json)

  var req = https.get('https://teamtreehouse.com/' + username + '.json', function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    })
    res.on('end', function() {
      if (res.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(e) {
          // Parse error
          printError(e);
        }
      } else {
        // Status code error
        printError({message: 'There was an error getting the profile for: ' + username + '. (' + http.STATUS_CODES[res.statusCode] + ')'})
      }
    })
  }).on('error', printError);
}




module.exports.get = get; 
