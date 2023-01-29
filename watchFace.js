// Load fonts
  require("Font7x11Numeric7Seg").add(Graphics);

// position 
  const X = 160, Y = 140;

  function draw() {
 

  // determine time
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
  
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  
  // Reset the state of the graphics library
  g.reset();
   
  // AM/PM
  var ampm = "PM";
  if (am) {
    ampm = "AM";
  }
  
  // morning
  if (am) {
  g.reset();
  g.setBgColor("##F6A21E"); // orange
  g.fillRect(0, 0, 175, 175);
  g.setColor("#FDFDFD");  
  g.drawString("Good morning,", g.getWidth()/2, 40, false);
    
  // night
  } else if ((h >= 8) && (m >= 0)) {
  g.reset();
  g.setFontAlign(0,0).setFont("Vector",18);
  g.setBgColor("#050A30");// dark blue
  g.fillRect(0, 0, 175, 175);
  g.setColor("#FDFDFD");  
  g.drawString("Good night,", g.getWidth()/2, 35, false);
    
  // evening
  } else if (h >= 6) {
  g.reset();
  g.setFontAlign(0,0).setFont("Vector",18);
  g.setColor("#E55B13"); // dark orange
  g.fillRect(0, 0, 175, 180);
  g.setColor("#FDFDFD"); 
  g.drawString("Good evening,", g.getWidth()/2, 35, false);
    

  // afternoon
  } else {
  g.reset();
  g.setBgColor("#68BBE3"); // bright blue 
  g.fillRect(0, 0, 175, 175);
  g.setColor("#FDFDFD");  
  g.drawString("Good afternoon,", g.getWidth()/2, 35, false);
  
  }

  // Name
  g.setFontAlign(0,0).setFont("Vector",32);
  g.setColor("#FDFDFD");  
  g.drawString("Pranavi!", g.getWidth()/2, 70, false);

  
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",3.5);
  g.setFontAlign(1,2); // align right bottom
  g.setColor("#FDFDFD");  
  g.drawString(time, X-35, Y-10, false);
  
  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0,5); // align center bottom
  
  var dateStr = "    "+require("locale").date(d)+"    ";
  g.setColor("#FDFDFD");  
  g.drawString(dateStr, g.getWidth()/2, Y+15, false);
  
  // draw AM or PM
  g.drawString(ampm, 140, 120, false);


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
