lcdproc-client
==============
lcdproc-client is a partial implementation of the [LCDproc](http://lcdproc.org/) protocol.

LCDproc is a daemon service for unix/linux systems that allows multiple programs to print out to the lcd display attached to a computer. For more information about LCDproc visit [http://lcdproc.org] . 

lcdproc-client implements part of the protocol.  Enough for you to create a screen with a couple of widgets that can be updated with new information. If this makes no sense to you then you're not familar with LCDproc. In layman's terms it lets you write text to the lcd screen. This library does not implement some of the more interesting features of lcdproc like timers and priorities.  If you need such features feel free to contact me or better yet send me a pull request with your own changes.

Look at `example.js` for an example of the lcdproc-client code implementation.

If you want to try the code but do not have a lcd connected to your computer then try run the curses driver for lcdproc in a terminal window (LCDproc -d curses).
