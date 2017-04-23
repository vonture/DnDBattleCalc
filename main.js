var army0 = new army(document.getElementById("army0"));
var army1 = new army(document.getElementById("army1"));
var weather0 = new weather(document.getElementById("weather"));

var battleButton = document.createElement("button");
battleButton.appendChild(document.createTextNode("battle"));
battleButton.onclick = function()
{
    runBattle(army0, army1, weather0, document.getElementById("battleLog"));
};
document.getElementById("battleButton").appendChild(battleButton);
