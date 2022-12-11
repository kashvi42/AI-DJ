song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
 song=loadSound("music.mp3");

}

function setup()
{
 canvas=createCanvas(800,800);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose', gotResults);
 
}
function modelLoaded(){
    console.log("model loaded");

}
function gotResults(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+" rightWristY="+rightWristY);
    }

}
function draw(){
    image(video,0,0,800,800);
    
    fill("#FF0000");
    stroke("#FF0000");


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML + "volume = " + volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}