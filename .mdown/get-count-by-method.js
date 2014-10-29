mdown.init(function (Meteor) {
  Meteor.call('pollCount', function (err, res) {
    Meteor.kill();
  });
});

mdown.run({
  concurrency: 10,
  url: process.env.URL || 'http://localhost:3000'
});
