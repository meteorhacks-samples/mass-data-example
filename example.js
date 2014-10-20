if (Meteor.isServer) {
  // add example users
  console.log('adding test users');
  Meteor.users.remove({});
  ['fPfmNL8WHH7RW2qa2', '59gH2uBGw9WaZx5tW', 'PnAxwQuMPnFaXoFD9', 'Wk5yHj75rWr2B2FRe', 'QBFrHeX5Qw9MJ2vpu', 'aQmTzcZ7W2t2Hn4eM', 'TSs9j9QPggsjzPGcX', 'xDfoANsqGPYRCzJHg', 'ftu4xKJGvNZKBwb5P', 'Tcx2drQ2vmKPKLSz3'].forEach(function (userId) {
    Meteor.users.insert({
      _id: userId,
      createdAt: Date.now(),
      emails: [{address: userId+'@meteorhacks.com', verified: false}],
      services: {password: {bcrypt: ''}}
    });
  });

  // add example content
  console.log('adding test content');
  Items = new Meteor.Collection('items');
  Items.remove({});
  _.times(100, function () {
    Items.insert({text: Random.id(5000)});
  });

  // example method
  Meteor.methods({
    doNothing: function (x) {
      return null;
    },

    getItems: function () {
      return Items.find().fetch();
    },

    fetchItems: function () {
      Items.find().fetch();
      return null;
    },

    observeItems: function () {
      Items.find().observe({added: Function.prototype});
      return null;
    },

    pollCount: function () {
      return Items.find().count();
    }
  });

  // example publication
  var counter = 0;
  Meteor.publish('items', function () {
    return Items.find();
  });

  Meteor.publish('items-noreuse', function () {
    return Items.find({_id: {$ne: counter++}});
  });

  var first = Random.id(5000);
  var changed = Random.id(5000);

  Meteor.publish('items-stream', function () {
    var self = this;
    this.ready();

    do_something();
    function do_something () {
      var id = Random.id();
      Items.insert({_id: id, text: first});
      Items.update({_id: id}, {$set: {text: changed}});
      Items.remove({_id: id});
      Meteor.setTimeout(do_something, 0);
    }

    return null;
  });

  Meteor.publish('custom-stream', function () {
    var self = this;
    this.ready();

    do_something();
    function do_something () {
      var id = Random.id();
      self.added('items', id, {text: first});
      self.changed('items', id, {text: changed});
      self.removed('items', id);
      Meteor.setTimeout(do_something, 0);
    }

    return null;
  });

  // publish item count
  Meteor.publish('items-count', function() {
    Counts.publish(this, 'c_'+counter, Items.find({_id: {$ne: counter++}}));
  });

  // initialize meteor-shower
  MeteorDown.init('ec852009-77cf-4db0-8cdf-d84b63d4403b');

  // connect to Kadira
  Kadira.connect('8uu7DLdj8D9nFNaRK', '7150939c-c8bf-41b5-8531-e9244d63e0d2');
}
