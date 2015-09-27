var LcdProcClient = require('lcdproc-client');
var lcd = new LcdProcClient(13666, 'localhost');

var widgets = {
  'first_line': {
    row: 1,
    default: 'Loading line 1....',
    interval: 30000
  },
  'second_line': {
    row: 2,
    default: 'Loading line 2....',
    interval: 1200000
  }
};

lcd.on('ready', function () {

  // Create LCD screen.
  lcd.createScreen('MyInfoScreen', {
    heartbeat: 'off'
  });

  // Loop through and set up widgets.
  Object.keys(widgets).forEach(function (key) {

    var widget = widgets[key];

    // Updates widget with 'static string'; you would probably want to fetch
    // data from somewhere.
    var updateWidget = function () {
      lcd.updateWidget(key, 1, widget.row, 20, widget.row, 'h', 1, 'static string');
    };

    // Make it scoll.
    lcd.addWidget(key, 'scroller');

    // Set initial values.
    lcd.updateWidget(key, 1, widget.row, 20, widget.row, 'h', 1, widget.default);

    // Update continuously.
    updateWidget();
    setInterval(updateWidget, widget.interval);

  });

});

lcd.init();
