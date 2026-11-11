var song = "";
var playing = false;
const playButton = document.getElementById("playButton");
var song1Playing = false;
var song2Playing = false;
const dudeSlider = document.getElementById("dudeSlider");

screenWidth = window.innerWidth;
screenHeight = window.innerHeight;


var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

function preload(){
    song1 = loadSound("duelofthefates.wav");
    song2 = loadSound("doyoulikeairconditioning.mp3")

    speedIcon = loadImage("duelofthefates.png");
    volIcon = loadImage("DOYOULIKEAIRCONDITIONING.png");

    leftDude = loadImage("dudeLeft.png")
    rightDude = loadImage("dudeRight.png")
    

}

function changeVolume(){
    song1.volume(document.getElementById("volumeSlider").value / 100);
    song2.volume(document.getElementById("volumeSlider").value / 100);
}

function changeSpeed(){
    song1.rate(document.getElementById("speedSlider").value / 100);
    song2.rate(document.getElementById("speedSlider").value / 100);
}


function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas = createCanvas(600, 500);
    canvas.position(screenWidth/2, screenHeight/2);

    video = createCapture(VIDEO);
    video.hide();

    if(dudeSlider.value == 2){
        posenet = ml5.poseNet(video, modelLoaded);
    } else  if(dudeSlider.value == 1){
        posenet = ml5.poseNet(leftDude, modelLoaded);
    } else  if(dudeSlider.value == 3){
        posenet = ml5.poseNet(rightDude, modelLoaded);
    }
    
    posenet.on("pose", gotPoses);

    
}

function modelLoaded(){
    console.log("POSENET INITIALIZED.")
}

function gotPoses(results){
    console.log("Poses!");
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("lwx = " + leftWristX + "lwy = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rwx = " + rightWristX + "rwy = " + rightWristY);

        numLeftWristY = Number(leftWristY);
        numRightWristY = Number(rightWristY);

        if(numLeftWristY > numRightWristY){
            song1Playing = true;
            song2Playing = false;
            console.log("Song1 Playing")
        } else {
            song2Playing = true;
            song1Playing = false;
            console.log("Song2 Playing")
        }

        if(song1Playing){
            if(!song1.isPlaying()){
                song1.play();
                console.log("played1")
            } else {console.log("notplayed1")}
            song2.pause();
            song1Playing = false;
        }
        if(song2Playing){
            if(!song2.isPlaying()){
                song2.play();
                console.log("played2")
            } else {console.log("notplayed2")}
            song1.pause();
            song2Playing = false;
        }


    }
}

function draw() {

    

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.position(screenWidth/2, screenHeight/2);
    console.log("screenWidth = " + screenWidth + " && screenHeight = " + screenHeight)


    if(dudeSlider.value == 2){
        image(video, 0, 0, 600, 500);
    } else if(dudeSlider.value == 1){
        image(leftDude, 0, 0, 600, 500);
    } if(dudeSlider.value == 3){
        image(rightDude, 0, 0, 600, 500);
    }
    

    stroke("#FF0000");
    fill("#FF0000");
    strokeWeight(5);

    line(rightWristX, rightWristY, leftWristX, leftWristY);




    circle(leftWristX,leftWristY,25);
    image(volIcon,leftWristX,leftWristY,100,100)
    


    

    circle(rightWristX,rightWristY,25);
    image(speedIcon,rightWristX,rightWristY,100,100)
    
}

function play(){

    if(playing){
        playing = false;
        song.pause();
        console.log("Paused Song");
        playButton.innerHTML = "Play"
    } else {
        playing = true;
        song.play();
        console.log("Playing Song");
        playButton.innerHTML = "Stop"   
    }
    
}