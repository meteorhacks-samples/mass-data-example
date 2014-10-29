mdown.init(function (Meteor) {
  Meteor.subscribe('items', function () {
    Meteor.kill();
  });
});

mdown.run({
  concurrency: 10,
  url: process.env.URL || 'http://localhost:3000'
});
