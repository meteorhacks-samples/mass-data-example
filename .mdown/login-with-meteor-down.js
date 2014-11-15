mdown.init(function (Meteor) {
  Meteor.call('doNothing', function (err, res) {
    Meteor.kill();
  })
});

mdown.run({
  concurrency: 10,
  url: process.env.URL || 'http://localhost:3000',
  key: '27d90ef4-0816-40b3-9027-4bc0560a86bd',
  auth: {userId: ['TQipcT99XjB4W9vvK']}
});
