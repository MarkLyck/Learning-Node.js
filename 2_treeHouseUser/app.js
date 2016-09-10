//Problem: We need a simple way to look at a user's badge count and Javascript points.
// Solution: Use Node.js to connect o TreeHouse's API to get profile information to print out.

var https = require('https')

var username = 'chalkers'

function printMessage(username, badgeCount, points) {
  var message = username + 'has ' + badgeCount + ' total badges and ' + points + ' points in JavaScript';
  console.log(message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)

var req = https.get('https://teamtreehouse.com/' + username + '.json', function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  })
  res.on('end', function() {
    var profile = JSON.parse(body);
    printMessage(username, profile.badges.length, profile.points.JavaScript);
  })
}).on('error', function(e) {
  console.error(e.message);
})




// printMessage('Chalkers', 1000, 2000000);
