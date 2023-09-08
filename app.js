const rule1 = document.getElementById('rule1');
const rule2 = document.getElementById('rule2');
const rule3 = document.getElementById('rule3'); 
const board = document.getElementById('board');

var c1 = document.getElementsByClassName('c1');
var c2 = document.getElementsByClassName('c2');
var c3 = document.getElementsByClassName('c3');

var conformButton = document.getElementById('conform');
var restartButton = document.getElementById('restart');
var replayButton = document.getElementById('replay');

 

var list = []
function loadPos(){  
    list = []
    for(var i = 0; i < c1.length; i++){
        list.push(parseInt(c1[i].innerHTML = generateRandomNumber(1,99)));
        list.push(parseInt(c2[i].innerHTML = generateRandomNumber(1,99)));
        list.push(parseInt(c3[i].innerHTML = generateRandomNumber(1,99)));
    } 
    for (let i = 0, j = 0; i < 21; i += 3, j++) { 
        c1[j].innerHTML = list[i];
        c2[j].innerHTML = list[i+1];
        c3[j].innerHTML = list[i+2];
        column[j][0] = list[i];
        column[j][1] = list[i+1];
        column[j][2] = list[i+2];
    }
}
 
showRules();
function showRules(){
    rule1.innerHTML = '1. Select any number in any columns';
    rule2.innerHTML = '2. Then Enter the column number in which your selected number is present';
    rule3.innerHTML = '3. Repeat this for three times only.';
}
function clearRule(){ 
    rule1.hidden = true;
    rule2.hidden = true;
    rule3.hidden = true;
    board.hidden = false;
    loadPos();
    conformButton.hidden = true;
    restartButton.hidden = false;
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let upper, middle, lower;
let column = Array.from({ length: 7 }, () => new Array(3)); 
let count = 0;
function getColumn(columnClick){ 
    if(count <= 3){
        count++;    
    middle = parseInt(columnClick);
    if (middle === 1) {
        upper = 2;
        lower = 3;
    } else if (middle === 2) {
        upper = 1;
        lower = 3;
    } else if (middle === 3) {
        upper = 2;
        lower = 1;
    } else {
        console.log("Invalid input");
        again = false;
        list[10] = null;
    }
    for (let i = 0; i < 7; i++) {
        list[i] = column[i][upper - 1];
        list[7 + i] = column[i][middle - 1];
        list[14 + i] = column[i][lower - 1];
    }
    for (let i = 0, j = 0; i < 21; i += 3, j++) { 
        c1[j].innerHTML = list[i];
        c2[j].innerHTML = list[i+1];
        c3[j].innerHTML = list[i+2];
        column[j][0] = list[i];
        column[j][1] = list[i + 1];
        column[j][2] = list[i + 2];
    } 
}
if(count == 3){
    numberGussed(list[10]);
}
}

function numberGussed(number){
    board.hidden = true;
    restartButton.hidden = true;
    replayButton.hidden = false;
    document.getElementById('number').innerHTML = 'Your Number: '+number;   
}

function replay(){
    replayButton.hidden = true;
    board.hidden = false;
    restartButton.hidden = false;
    loadPos();
    document.getElementById('number').innerHTML ='';
    count = 0;
}