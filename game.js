var btnColor=["red","blue","green","yellow"];
var pattern=[];
var userPattern=[];
var level =0;
var start = false;

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function checkAns(crtLevel){
    if (pattern[crtLevel] === userPattern[crtLevel]) {
        if (userPattern.length === pattern.length){
            setTimeout(function () { nextSequence();}, 1000);}}
            else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function () { $("body").removeClass("game-over");}, 200);
            startOver();
    }   
}

$(".btn").click(function(){
    var userClr= $(this).attr("id");
    userPattern.push(userClr);
    playSound(userClr); 
    animatePress(userClr);
    checkAns(userPattern.length-1);
});

function nextSequence(){
    userPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomVar = Math.floor(Math.random() * 4);
    var randomClr = btnColor[randomVar];
    pattern.push(randomClr);  
    $("#"+ randomClr).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomClr);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentClr){
    $("#" + currentClr).addClass("pressed");
    setTimeout(function(){ $("#"+currentClr).removeClass("pressed");},100);
}

function startOver(){
    level = 0;
    pattern =[];
    start=false;
}
