var MeteorShower = require('meteor-shower');

var shower = new MeteorShower(function (error, client) {
  client.call('fetchItems', function (err, res) {
    client.kill();
  });
});

shower.run({
  concurrency: 10,
  url: 'http://localhost:3000',
  key: 'ec852009-77cf-4db0-8cdf-d84b63d4403b',
  auth: {userId: ['fPfmNL8WHH7RW2qa2', '59gH2uBGw9WaZx5tW', 'PnAxwQuMPnFaXoFD9', 'Wk5yHj75rWr2B2FRe', 'QBFrHeX5Qw9MJ2vpu', 'aQmTzcZ7W2t2Hn4eM', 'TSs9j9QPggsjzPGcX', 'xDfoANsqGPYRCzJHg', 'ftu4xKJGvNZKBwb5P', 'Tcx2drQ2vmKPKLSz3']}
});