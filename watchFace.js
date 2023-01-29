// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 160, Y = 140;

function draw() {
  g.setBgColor(0x33FF77);
  g.setColor("#0000FF");
  g.setBgColor("#00FF00");
  g.setColor("#0000FF");
  g.fillRect(0, 26, 175, 175);
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var am = true;
  if (h > 12) {
    am = false;
    h = h - 12;
  } else if (h == 0) {
    h = 12;
  }
  g.setColor("#FDFDFD");  
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",3.5);
  g.setFontAlign(1,2); // align right bottom
  g.setColor("#FDFDFD");  
  g.drawString(time, X-35, Y-10, false);
//  draw.setColor("#140005");

  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0,5); // align center bottom
  // pad the date - this clears the background if the date were to change length
  
  var dateStr = "    "+require("locale").date(d)+"    ";
  g.setColor("#FDFDFD");  
  g.drawString(dateStr, g.getWidth()/2, Y+15, false);
  // AM/PM
  var ampm = "PM";
  if (am) {
    ampm = "AM";
  }

  g.drawString(ampm, 140, 120, false);
  // Custom
  g.setFontAlign(0,0).setFont("Vector",18);
  if (am) {
    g.setColor("#FDFDFD");  
    g.drawString("Good morning,", g.getWidth()/2, 40, false);
    g.setBgColor("#FFA500");
  } else if ((h >= 9) && (m >= 30)) {
    g.setColor("#FDFDFD");  
    g.drawString("Good night,", g.getWidth()/2, 40, false);
    g.setBgColor("#050A30");// dark blue
  } else if (h >= 6) {
    g.setBgColor("#0000FF"); // evening light blue color
    g.setColor("#FDFDFD");  
    g.drawString("Good evening,", g.getWidth()/2, 40, false);

  } else {
    g.setColor("#FDFDFD");  
    g.drawString("Good afternoon,", g.getWidth()/2, 40, false);
  }
  // Name
  g.setFontAlign(0,0).setFont("Vector",32);
  g.setColor("#FDFDFD");  
  g.drawString("Pranavi!", g.getWidth()/2, 70, false);


}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});
// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
