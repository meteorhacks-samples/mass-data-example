Items = new Meteor.Collection('items');

if (Meteor.isServer) {
  // add example content
  if(!Items.find().count()) {
    _.times(200, function () {
      Items.insert({text: Random.id(5000)});
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
    this.ready();
    send_data();
    function send_data() {
      var id = Items.insert({text: first});
      Items.update({_id: id}, {$set: {text: changed}});
      Items.remove({_id: id});
      Meteor.setTimeout(send_data, 0);
    }
  });

  Meteor.publish('custom-stream', function () {
    var self = this;
    this.ready();
    send_data();
    function send_data() {
      var id = get_id();
      self.added('custom', id, {text: first});
      self.changed('custom', id, {text: changed});
      self.removed('custom', id);
      Meteor.setTimeout(send_data, 0);
    }
  });

  // publish item count
  Meteor.publish('items-count', function () {
    Counts.publish(this, 'c_'+counter, Items.find({_id: {$ne: get_id()}}));
  });

  // connect to Kadira
  Kadira.connect('8uu7DLdj8D9nFNaRK', '7150939c-c8bf-41b5-8531-e9244d63e0d2');

  // helpers
  var counter = 0;
  function get_id () {
    return (counter++).toString();
  }
}
