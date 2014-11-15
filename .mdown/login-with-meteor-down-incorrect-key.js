mdown.init(function (Meteor) {
  Meteor.call('doNothing', function (err, res) {
    Meteor.kill();
  })
});

mdown.run({
  concurrency: 10,
  url: process.env.URL || 'http://localhost:3000',
  key: 'a',
  auth: {userId: ['TQipcT99XjB4W9vvK']}
});
