var status = "";
var objects = [];

function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture();
    video.size(600, 600);
    video.hide();
}

function gotResult(error, result) {
    if(error){
        console.err(error);
    }
    console.log(result);
    objects = result;
}

function modelLoaded(){
    console.log('model loaded');
    status = true;
    model.detect(video, gotResult);
}



function draw(){
    image(video, 0, 0, 600,600);
    
    if(status != ""){
        console.log("Inside Draw");
        for(var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected" + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
    }
  }
}

function start(){
    model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting........";
}