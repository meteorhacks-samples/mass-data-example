mdown.init(function (Meteor) {
  Meteor.subscribe('custom-stream', function () {
    // do not kill the client
  });
});

mdown.run({
  concurrency: 10,
  url: process.env.URL || 'http://localhost:3000'
});
