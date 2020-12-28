
const play = document.getElementById("play");
const game = document.getElementById("game");   
const add = document.getElementById("start-game");
const winner = document.getElementById("winner");
const divInput = document.getElementById("div-casing-input-name-2");
const divPlayer_2 = document.getElementById("name-2");
const casingName_2= document.getElementById("div-casing-name-2")

var myVar = setInterval(ViewName2, 1000);
var idGlobsl = 0;
var existingCookie = Name2Cookie()
CreatTable(existingCookie);