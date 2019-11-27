//Get elements in variables
var ques = document.getElementById("ques");
var ans = document.getElementById("ans");
var img = document.getElementById("hmimg");
var keypad = document.getElementsByClassName("keypad");
var keyBtn = document.getElementsByClassName("keys");
var restart = document.getElementById("restart");
var solved = document.getElementById("solved");
var hint = document.getElementById("hint");

//Category, Words and Hint
var category = ["Sport", "Brand", "Marvel", "Movie"];
var wordsBox =[
    ["CRICKET", "SOCCER", "HOCKEY", "BADMINTON", "BASKETBALL"],
    ["MICROSOFT", "GOOGLE", "APPLE", "PUMA", "FERRARI"],
    ["THANOS", "SPIDERMAN", "HAWKEYE", "THOR", "HULK"],
    ["SULTAN", "DANGAL", "ROBOT", "BAAHUBALI", "SIMMBA"]
];
var hintBox =[
    ["Umpire", "Football", "Sandeep Singh", "Racket", "Ring"],
    ["Windows", "Search Engine", "Fruit", "Panther", "Horse"],
    ["Supervillain", "Peter Parker", "Clint Barton", "God of Thunder", "Bruce Banner"],
    ["Wrestling", "Mahavir Singh Phogat", "Dr. Vashikaran", "Mahishmati", "Ranveer Singh"]
];

//Variables for functioning
var word; //Given Word
var initWord = []; //Blanks for Word
var nextImg = 1; //Image number
var solvedValue = 0; //score

//Gives new word
function newWord(){
    var catNumber = Math.floor(Math.random()*category.length);
    var wordNumber = Math.floor(Math.random()*wordsBox[catNumber].length);
    ques.innerHTML = category[catNumber];
    word = wordsBox[catNumber][wordNumber];
    hint.innerHTML=hintBox[catNumber][wordNumber];
    //Removes old words
    wordsBox[catNumber].splice(wordNumber,1);
    hintBox[catNumber].splice(wordNumber,1);
    if(wordsBox[catNumber].length<1){
        category.splice(catNumber,1);
        wordsBox.splice(catNumber,1);
        hintBox.splice(catNumber,1);
    }
}

//Blanks for given word
function blanks(){
    for(let i=0; i<word.length; i++){
        initWord.push("_");
    }
    ans.innerHTML = initWord.join(" ");
}

//Create Keypad
for (let i=0; i<26; i++){
    var key = document.createElement("button");
    keypad[0].insertBefore(key, restart);
    key.setAttribute("class", "keys");
    key.innerHTML = String.fromCharCode(i+65);
}

//Keypad functions
function keyFunctions(){
    for(let i=0; i<26; i++){
        keyBtn[i].addEventListener("click", disableKey);
        keyBtn[i].addEventListener("click", keyPress);
        keyBtn[i].addEventListener("mouseover", keyOver);
        keyBtn[i].addEventListener("mouseout", keyOut);
    }
    restart.addEventListener("click", restartGame);
}
//Key disabled
function disableKey(){
    this.style.color= "gray";
    this.style.backgroundColor= "lightgray";
    this.style.boxShadow= "none";
    this.removeEventListener("click", disableKey);
    this.removeEventListener("mouseover", keyOver);
    this.removeEventListener("mouseout", keyOut);
}
//Key enabled
function enableKey(){
    for (let i=0; i<26; i++){
        keyBtn[i].style.color= "black";
        keyBtn[i].style.backgroundColor= "white";
        keyBtn[i].style.border= "1px solid black";
        keyBtn[i].style.boxShadow= "4px 6px 8px rgba(0, 0, 0, .5)";
    }
}
//Mouse Over
function keyOver(){
    this.style.backgroundColor = "lightgray";
    this.style.color = "black";
    this.style.cursor = "pointer";
}
//Mouse Out
function keyOut(){
    this.style.color= "black";
    this.style.backgroundColor= "white";
    this.style.border= "1px solid black";
    this.style.boxShadow= "4px 6px 8px rgba(0, 0, 0, .5)";
}
//Restart game 
function restartGame(){
    location.reload();
}

//Game Over
function gameOver(){
    img.src = "hm7.png";
    for(let i=0; i<word.length; i++){
        initWord[i]=word[i];
        ans.innerHTML = initWord.join(" ");
    }
}

//Win
function win(){
    img.src= "hm8.png";
}

//Starting functions
newWord();
blanks();
keyFunctions();

//Function on key press
function keyPress(){
    this.removeEventListener("click", keyPress);
    var count = 0;
    for(let i in word){
        if(this.innerHTML==word[i]){
            initWord[i]=this.innerHTML;
            ans.innerHTML = initWord.join(" ");
        }
        else{
            count++;
            if(count==word.length){
                img.src = "hm"+nextImg+".png";
                nextImg++;
            }
        }
    }
    
    if(initWord.indexOf("_")<0){
        if(category.length<1){
            for(let i=0; i<26; i++){
                keyBtn[i].removeEventListener("click", disableKey);
                keyBtn[i].removeEventListener("click", keyPress);
            }
            solvedValue++;
            solved.innerHTML = "Solved: " + solvedValue;
            win();
        }
        else{
            initWord.length = 0;
            solvedValue++;
            solved.innerHTML = "Solved: " + solvedValue;
            img.src = "hm0.png";
            nextImg = 1;
            setTimeout(newWord,400);
            setTimeout(blanks,400);
            keyFunctions();
            setTimeout(enableKey,400);
        }
    }
    
    if(nextImg==7){
        for(let i=0; i<26; i++){
            keyBtn[i].removeEventListener("click", disableKey);
            keyBtn[i].removeEventListener("click", keyPress);
        }
        setTimeout(gameOver,400);
    }
}