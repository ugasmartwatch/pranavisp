// records the time that the notification is pushed
var askEpoch = Math.floor(Date.now()/1000);

// sets up buttons 
var Layout = require("Layout");
var yes = 0;
var no = 0;
var layout = new Layout ({
  type:"v", c: [
    {type:"txt", font:"6x8:1", label:"", id:"labelY"},
    {type:"btn", font:"6x8:2", label:"Yes", cb: w => setLabel("Yes")}, 
    {type:"txt", font:"6x8:2", label:"", id:"labelY"},
    {type:"txt", font:"6x8:2", label:"Did you go on \n a walk today?", id:"label"}, 
    {type:"txt", font:"6x8:2", label:"", id:"labelY"},
    {type:"btn", font:"6x8:2", label:"No", cb: l=>setLabel("No") }
  ]
});

// takes in the user input and displays messages and updates json file accordingly
function setLabel(x) {
  if (x == "No") {
    var nowEpochNo = Math.floor(Date.now()/1000);
    g.fillRect(0, 0, 175, 175);
    g.setColor("#FDFDFD");  
    g.drawString("Go take your \n pet on a walk!", 80, 80, false);
    setTimeout(() => {load();}, 2000);
    layout = "hidden";   
    
     var fileNo = require("Storage").open("surveyData.json","a");
fileNo.write("\n ," + "{" + "\"q\"" + ":" + "\"Did you go on a walk today?\"" + "," + "\"a\"" + ":" + "\"no\"" + "," + "\"tAsk\"" + ":" + "\"" + askEpoch.toString() + "\"" + "," + "\"tAns\"" + ":" + "\"" + nowEpochNo.toString() + "\"" + "}", "\n");
    
  } // if no

  if (x == "Yes") {
    var nowEpochYes = Math.floor(Date.now()/1000);
    g.fillRect(0, 0, 175, 175);
    g.setColor("#FDFDFD");
    g.drawString("Yay!! \n Good job!!", 80, 85, false);
    setTimeout(() => {load();}, 2000);
    layout = "hidden";
    
   var fileYes = require("Storage").open("surveyData.json","a");
fileYes.write("{" + "\"q\"" + ":" + "\"Did you go on a walk today?\"" + "," + "\"a\"" + ":" + "\"yes\"" + "," + "\"tAsk\"" + ":" + "\"" + askEpoch.toString() + "\"" + "," + "\"tAns\"" + ":" + "\"" + nowEpochYes.toString() + "\"" + "}", + "," + "\n");
  
  } // if yes

} //setLabel

g.clear();
layout.render();
