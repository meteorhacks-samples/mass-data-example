Items = new Meteor.Collection('items');

if (Meteor.isServer) {
  // add example content
  if(!Items.find().count()) {
    _.times(200, function () {
      Items.insert({text: Random.id(5000)});
    });
  }

  // add example users
  if(!Meteor.users.find().count()) {
    Meteor.users.insert({
      _id: 'TQipcT99XjB4W9vvK',
      createdAt: new Date(),
      emails: [{address: 'user@gmail.com', verified: true}],
      services: {'password': {
        bcrypt: '$2a$10$71RPlxQIdpCLNdLa/IPwqOxVzezBk4Iuyonh/3nlxJ6nrpNDdn61G'
      }}
    });
  }

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
      var handler = Items.find().observe({added: Function.prototype});
      handler.stop();
      return null;
    },

    pollCount: function () {
      return Items.find().count();
    },

    triggerError: function () {
      throw new Error('test error');
    }
  });

  // example publication
  Meteor.publish('items', function () {
    return Items.find();
  });

  Meteor.publish('items-noreuse', function () {
    return Items.find({_id: {$ne: get_id()}});
  });

  var first = Random.id(5000);
  var changed = Random.id(5000);

  Meteor.publish('items-stream', function () {
    var self = this;
    var timer = null;
    this.ready();
    this.onStop(function () {
      timer && Meteor.clearTimeout(timer);
    });

    send_data();
    function send_data() {
      var id = Items.insert({text: first});
      Items.update({_id: id}, {$set: {text: changed}});
      Items.remove({_id: id});
      timer = Meteor.setTimeout(send_data, 100);
    }
  });

  Meteor.publish('custom-stream', function () {
    var self = this;
    var timer = null;
    this.ready();
    this.onStop(function () {
      timer && Meteor.clearTimeout(timer);
    })

    send_data();
    function send_data() {
      var id = get_id();
      self.added('custom', id, {text: first});
      self.changed('custom', id, {text: changed});
      self.removed('custom', id);
      timer = Meteor.setTimeout(send_data, 100);
    }
  });

  // publish item count
  Meteor.publish('items-count', function () {
    Counts.publish(this, 'items', Items.find({_id: {$ne: get_id()}}));
  });

  Meteor.publish('items-count-nr', function () {
    var opts = {nonReactive: true};
    Counts.publish(this, 'items-nr', Items.find({_id: {$ne: get_id()}}), opts);
  });

  // connect to Kadira
  // Kadira.connect('C43kzqyeXfDAMEByA', 'c9b66ded-19b2-488b-b5e9-5b0125e3c9e9');
  Kadira.connect('dmMW2wXgzNtv9Mi8W', '865a2908-61b9-4b33-a83f-d7d32f6e122c', {
    endpoint: 'http://localhost:11011'
  });

  // helpers
  var counter = 0;
  function get_id () {
    return (counter++).toString();
  }
}
