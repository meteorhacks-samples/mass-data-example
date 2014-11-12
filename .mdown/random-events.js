mdown.init(function (Meteor) {
  actions[Math.floor(actions.length * Math.random())](Meteor);
});

mdown.run({
  concurrency: 5,
  url: process.env.URL || 'http://localhost:3000'
});

var actions = [
  function fetch_data_items(Meteor) {
    Meteor.call('fetchItems', function (err, res) {
      Meteor.kill();
    });
  },
  function get_count_by_method(Meteor) {
    Meteor.call('pollCount', function (err, res) {
      Meteor.kill();
    });
  },
  function get_count_by_pubsub(Meteor) {
    Meteor.subscribe('items-count', function (err, res) {
      Meteor.kill();
    });
  },
  function get_data_by_method(Meteor) {
    Meteor.call('getItems', function (err, res) {
      Meteor.kill();
    });
  },
  function get_data_by_pubsub_changes(Meteor) {
    Meteor.subscribe('items-stream', function () {
      setTimeout(function () {
        Meteor.kill();
      }, 5 * 1000);
    });
  },
  function get_data_by_pubsub_custom(Meteor) {
    Meteor.subscribe('custom-stream', function () {
      setTimeout(function () {
        Meteor.kill();
      }, 5 * 1000);
    });
  },
  function get_data_by_pubsub_noreuse(Meteor) {
    Meteor.subscribe('items-noreuse', function () {
      Meteor.kill();
    });
  },
  function get_data_by_pubsub(Meteor) {
    Meteor.subscribe('items', function () {
      Meteor.kill();
    });
  },
  function observe_items_added(Meteor) {
    Meteor.call('observeItems', function (err, res) {
      Meteor.kill();
    });
  },
  function send_data_by_method(Meteor) {
    Meteor.call('doNothing', data, function (err, res) {
      Meteor.kill();
    });
  },
  function trigger_method_error(Meteor) {
    Meteor.call('triggerError', function (err, res) {
      Meteor.kill();
    });
  },
];

var data = {text: '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'};
