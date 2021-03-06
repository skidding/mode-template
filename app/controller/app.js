var mode = require('mode');
module.exports = mode.controller.REST.extend(function(parent) {
  this.init = function() {
    parent.init.call(this);
    if (this.conn) {
      // Store session reference
      this.session = this.conn.req.session;
      // Init and store notification reference
      this.notifications = mode.module.notification.init(this.session);
      // Pass notification to view vars
      this.args.notifications = this.notifications;
    }
    // Set default page title
    this.args.title = 'node.js project';
  };
  this.notify = function(type, message) {
    if (this.notifications) {
      this.notifications.add(type, message);
    }
  };
  this.on('created', function(error, item) {
    var type = this.model.group;
    if (!error) {
      this.notify('success', 'Created ' + type + ' successfully!');
    } else {
      this.notify('error', 'Could not create ' + type + '!');
    }
  });
  this.on('updated', function(error, item) {
    var type = this.model.group;
    if (!error) {
      this.notify('success', 'Updated ' + type + ' successfully!');
    } else {
      this.notify('error', 'Could not update ' + type + '!');
    }
  });
  this.on('deleted', function(error, item) {
    var type = this.model.group;
    if(!error) {
      this.notify('notice', 'Deleted ' + type + ' successfully!');
    } else {
      this.notify('error', 'Could not delete ' + type + '!');
    }
  });
}, true);