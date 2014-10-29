var net = require("net");
var events = require("events");
var lodash = require("lodash");

var screenDefaults = {
  backlight: "on",
  heartbeat: "on",
  priority: 2
};

var escapeString = function (str) {
  var needsEscaping = typeof str === 'string' && str.indexOf(' ') !== -1;
  return (needsEscaping) ? "{" + str + "}" : str;
};

var LCDClient = function (host, port) {
  this.socket = new net.Socket();
  this.host = host;
  this.port = port;
};

LCDClient.prototype.createScreen = function (name, options) {

  var self = this;

  options = lodash.extend({}, screenDefaults, options);
  self.name = name || "default_screen";

  self.socket.write("screen_add " + self.name + "\n");

  Object.keys(options).forEach(function (key) {
    self.writeSocket("screen_set", self.name, key, options[key]);
  });

}

LCDClient.prototype.writeSocket = function () {
  var args = Array.prototype.slice.call(arguments);
  args = lodash.flatten(args);
  args = lodash.map(args, escapeString);
  this.socket.write(args.join(" ") + "\n");
};

LCDClient.prototype.addWidget = function (name, type) {
  type = type || "string";
  this.writeSocket("widget_add", this.name, name, type);
}

LCDClient.prototype.updateWidget = function (name) {
  // Output strings must be wrapped in curly braces: "{string}".
  var args = Array.prototype.slice.call(arguments, 1);
  this.writeSocket("widget_set", this.name, name, args);
}

LCDClient.prototype.init = function () {

  var self = this;

  self.socket.connect(self.host, self.port, function () {
    this.write("hello\n");
    self.emit("init");
  });

  self.socket.on("data", function (d) {
    var data_str = d.toString();
    var params = data_str.split(" ");
    if (params[0] == "connect") {
      for (var i = 1; i < params.length; i++) {
        if (params[i - 1] === "wid") {
          self.width = params[i];
        }
        if (params[i - 1] === "hgt") {
          self.height = params[i];
        }
      }
      self.writeSocket("client_set", "name", "{node-lcdproc}");
      self.emit('ready');
    }
  });

}

LCDClient.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = LCDClient;
