objects = [];
video = "";
status = "";
function setup(){
 canvas = createCanvas(600,400);
 canvas.center()
}

function preload(){
video = createVideo("video.mp4");
video.hide();
}

function draw(){
    image(video,0,0,600,400);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<=objects.length;i++){
         document.getElementById("status").innerHTML = "Status : Object Detected!";
         document.getElementById("number_of_objects").innerHTML = "no. of objects :"+objects.length;
         fill("red");
         stroke("red");
         percent = floor(object[i].confidence * 100);
         text(object[i].label + " " + percent+"%", objects[i].x, objects[i].y);
         noFill();
         rect(object[i].x, objects[i].y, objects[i].width, objects[i].heigth);

        }
    }
}
 
function start(){
objectDetector = ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Object";

}

function modelLoaded(){
console.log("model Loaded!");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    objects = results;
    console.log(results);
}
}

