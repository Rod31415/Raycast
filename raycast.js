const PI=3.1415926535;
var xP=50;
var yP=50;
var angle=0;
var speed=1.7;
var avanza=0;
var level=1;

var matr=[];
var matR=[];
var matG=[];
var matB=[];

var matr2=[];
var matR2=[];
var matG2=[];
var matB2=[];


var disx=0;
var disy=0;
var dis=0;
var lados=false;
var ladosa=false;
var imageC=false;
var ratio=0;
var hS;
var t=0;
var supLY;
var salto=false;
var tiempo=20;

var horizontal=false;

var lookY;
var tilerad=5;
var tem=11-tilerad;

var fovC=90;
var fov=fovC*(PI/180);

var rad=PI/180;
var hitx;
var hity;


var vx;
var vx;
var dv;


var bullet=false;
var xbullet=0;
var ybullet=0;
var xbS, ybS;

for (let i=0; i<1900; i++) {
  matr[i]=[];
  matR[i]=[];
  matG[i]=[];
  matB[i]=[];
  matr2[i]=[];
  matR2[i]=[];
  matG2[i]=[];
  matB2[i]=[];
}

var shot;
let bomb;
var nIn=1;

var endx=135;
var endy=339;


///////////////IMAGES///////////////////
let suelo;
let techo;

let win;

let bricks;
let br=[];

let wood;
let wd=[];

let planks;
let pl=[];



let mapI2;
let mapI;

let enemy;
let gun;
let doom;
let c4;
var spr=false;
let disp;
let ind;
let sky;
let tile=[];
/////////////////////////////////////////


function col1(px, py, r, g, b) {
  if (matR[px][py]==r&&matG[px][py]==g&&matB[px][py]==b) {
    return true;
  } else {
    return false;
  }
}
function col2(px, py, r, g, b) {
  if (matR2[px][py]==r&&matG2[px][py]==g&&matB2[px][py]==b) {
    return true;
  } else {
    return false;
  }
}



function degrees(rad) {
  return rad*(180/PI);
}
function preload() {
  
  mapI=loadImage("sprites/mapa.png");

  planks=loadImage("sprites/planks.png");
  wood=loadImage("sprites/wood.png");
  bricks=loadImage("sprites/wall.png");

  c4=loadImage("sprites/c4.png");
  bomb=createAudio("sprites/bomb.wav");
}
function Rotate(x, y) {
  vx=x*cos(angle)-y*sin(angle);
  vx=x*sin(angle)+y*cos(angle);
}



function img(imag, x, y, ang) {
  var Xd=x-xP;
  var Yd=y-yP;
  var DIST=sqrt(Xd*Xd+Yd*Yd);
  image(imag, (ang/2*width)-DIST, height);
}



function bulletF() {
  if (nIn==1) {
    ratio=1;
    shot.play();
  }
  if (nIn==2) {
    ratio=10;
    bomb.play();
  }
  xbullet=xP;
  ybullet=yP;
  xbS=0.5*cos(angle);
  ybS=0.5*sin(angle);
  while (col1(parseInt(xbullet), parseInt(ybullet), 255, 255, 255)) {
    xbullet+=xbS;
    ybullet+=ybS;
  }
  if (nIn==2) {
    for (let f=0; f<2*PI; f+=rad) {
      console.log(f);
      var xR=40*cos(f)/40;
      var yR=40*sin(f)/40;
      for (let h=1; h<=50; h++) {
        matr[parseInt(xP+xR*h)][parseInt(yP+yR*h)]=255;
      }
    }
  }
  if (col1(parseInt(xbullet), parseInt(ybullet), 122, 67, 0)) {
    for (let f=0; f<2*PI; f+=rad) {
      var xR=parseInt(ratio*cos(f));
      var yR=parseInt(ratio*cos(f));
      matr[parseInt(xbullet)+xR][parseInt(ybullet)+yR]=255;
    }
  }
  if (col1(parseInt(xbullet), parseInt(ybullet), 255, 174, 0)) {
    for (let f=0; f<2*PI; f+=rad) {
      var xR=ratio*cos(f);
      var yR=ratio*cos(f);
      matr[parseInt(xbullet)+xR][parseInt(ybullet)+yR]=255;
    }
    console.log("Mataste un enemigo");
  }
}
var canvas;
let vector1;
var t=0;
var nm=1;
var sp=[];
function setup() {

  canvas=createCanvas(1200, 900);
  canvas.position(100, 0);
  for (let i=0; i<32; i++) {
    br[i] = createImage(1, 32);
    br[i]=bricks.get(i, 0, 1, 32);
    wd[i] = createImage(1, 32);
    wd[i]=wood.get(i, 0, 1, 32);
    pl[i] = createImage(1, 32);
    pl[i]=planks.get(i, 0, 1, 32);
  }
  mapI.loadPixels();
  for (let i=0; i<mapI.width; i++) {
    for (let j=0; j<mapI.height; j++) {
      const index=(i+j*mapI.width)*4;
      matR[i][j]=mapI.pixels[index];
      matG[i][j]=mapI.pixels[index+1];
      matB[i][j]=mapI.pixels[index+2];
      matr[i][j]=(matR[i][j]+matG[i][j]+matB[i][j])/3;
      if (col1(i, j, 0, 255, 0)) {
        matr[i][j]=255;
        xP=i;
        yP=j;
      }
      if (col1(i, j, 255, 0, 255)) {
        matr[i][j]=255;
      }
      
      if (col1(i, j, 0, 255, 0)) {
        matr[i][j]=255;
        xP=i;
        yP=j;
      }
      if (col1(i, j, 255, 0, 255)) {
        matr[i][j]=255;
      }
    }
  }
}

function ray(s) {
  for (let a=-fov/2; a<fov/2; a+=rad/(tilerad*3)) {
    var xs=0.5*cos(angle+a);
    var ys=0.5*sin(angle+a);
    hitx=xP;
    hity=yP;
    var phx=parseInt(hitx);
    var phy=parseInt(hity);
    var ix=-1000;
    var iy=-1000;
    imageC=true;
    imageEn=false;
    while (matr[phx][phy]>=255) {
      hitx+=xs;
      hity+=ys;
      phx=parseInt(hitx);
      phy=parseInt(hity);
      disx=(hitx-xP);
      disy=(hity-yP);
      dis=sqrt((disx*disx)+(disy*disy));
      if (dis>=300) {
        imageC=false;
        break;
        a+=rad/(tilerad*15);
      }
      if (col1(phx, phy, 255, 0, 255)) {
        ix=hitx;
        iy=hity;
        ImageEn=true;
      }
    }

    if (col1(phx, phy, 0, 0, 0)||col1(phx, phy, 255, 110, 0)||col1(phx, phy, 255, 0, 0)) {
      horizontal=false;
    }
    if (col1(phx, phy, 0, 0, 255)||col1(phx, phy, 255, 255, 0)||col1(phx, phy, 0, 255, 255)) {
      horizontal=true;
    }

    //if(ix!=-1000 &&iy!=-1000){image(enemy,(a/fov)*width+width/2,550-lookY,disH*1,disH*1);}

    disI=600-(sqrt((ix-xP)*(ix-xP)+(iy-yP)*(iy-yP)));
    x3d=a*(180/PI);
    var disH=dis;
    var ca=a;
    if (ca<0) {
      ca+=2*PI;
    }
    if (ca>2*PI) {
      ca-=2*PI;
    }
    dis=dis*cos(ca);
    disH=(16*300)/dis;



    if (!col1(phx, phy, 0, 255, 0)) {
      if (col1(phx, phy, 0, 0, 255)||col1(phx, phy, 0, 0, 0)) {
        tile=br;
      } else if (col1(phx, phy, 255, 110, 0)||col1(phx, phy, 255, 255, 0)) {
        tile=wd;
      } else if (col1(phx, phy, 255, 0, 0)||col1(phx, phy, 0255, 255)) {
        tile=pl;
      }

      if (imageC==true) {
        if (horizontal==true) {
          image(tile[parseInt(phx%32)], (a/fov)*width+550, 600-lookY-(s*disH), 1, 2*disH);
        } else if (horizontal==false) {
          image(tile[parseInt(phy%32)], (a/fov)*width+550, 600-lookY-(s*disH), 1, 2*disH);
        }
      } else {
        fill(0);
        rect((a/fov)*width+550, 600-lookY-(disH), 1, 2*disH);
      }
    
    if(imageEn==true){
      image(enemy, (a/fov)*width+width/2, 550-lookY, disH*1, disH*1);}
    }
        
   

      if (keyIsPressed==true) {
        if (keyCode==32&&col1(phx, phy, 255, 0, 0)&&dis<10) {
          matr[phx][phy]=255;
        }
      }
    }
    spr=false;
  }



/* 

              this is for another map
              
              
function ray2(s) {

  for (let a=-fov/2; a<fov/2; a+=rad/(tilerad*3)) {
    var xs=0.5*cos(angle+a);
    var ys=0.5*sin(angle+a);
    hitx=xP;
    hity=yP;
    var phx=parseInt(hitx);
    var phy=parseInt(hity);
    var ix=-1000;
    var iy=-1000;
    imageC=true;
    while (matr2[phx][phy]>=255) {
      hitx+=xs;
      hity+=ys;
      phx=parseInt(hitx);
      phy=parseInt(hity);
      disx=(hitx-xP);
      disy=(hity-yP);
      dis=sqrt((disx*disx)+(disy*disy));
      if (dis>=300) {
        a+=rad/(tilerad*15);
        imageC=false;
        break;
      }
      if (col2(phx, phy, 255, 0, 255)) {
        ix=hitx;
        iy=hity;
        ImageC=false;
      }
      if (phx>=mapI2.width||phy>=mapI2.height||phx<=0||phy<=0) {
        break;
      }
    }

    if (col2(phx, phy, 0, 0, 0)||col2(phx, phy, 255, 110, 0)||col2(phx, phy, 255, 0, 0)) {
      horizontal=false;
    }
    if (col2(phx, phy, 0, 0, 255)||col2(phx, phy, 255, 255, 0)||col2(phx, phy, 0, 255, 255)) {
      horizontal=true;
    }

    

    disI=600-(sqrt((ix-xP)*(ix-xP)+(iy-yP)*(iy-yP)));
    x3d=a*(180/PI);
    var disH=dis;
    var ca=a;
    if (ca<0) {
      ca+=2*PI;
    }
    if (ca>2*PI) {
      ca-=2*PI;
    }
    dis=dis*cos(ca);
    disH=(16*300)/dis;



    if (!col2(phx, phy, 0, 255, 0)) {
      if (col2(phx, phy, 0, 0, 255)||col2(phx, phy, 0, 0, 0)) {
        tile=br;
      } else if (col2(phx, phy, 255, 110, 0)||col2(phx, phy, 255, 255, 0)) {
        tile=wd;
      } else if (col2(phx, phy, 255, 0, 0)||col2(phx, phy, 0255, 255)) {
        tile=pl;
      }

      if (imageC==true) {
        if (horizontal==true) {
          image(tile[parseInt(phx%32)], (a/fov)*width+550, 600-lookY-(s*disH), 1, 2*disH);
        } else if (horizontal==false) {
          image(tile[parseInt(phy%32)], (a/fov)*width+550, 600-lookY-(s*disH), 1, 2*disH);
        }
      }
    } else {
      fill(0);
      rect((a/fov)*width+550, 600-lookY-(disH), 1, 2*disH);
    }
    //console.log();


    if (keyIsPressed==true) {
      if (keyCode==32&&col2(phx, phy, 255, 0, 0)&&dis<10) {
        matr2[phx][phy]=255;
      }
    }
  }
}
*/
function draw() {
  frameRate(160);
  if (angle>=2*PI) {
    angle-=2*PI;
  } else if (angle<=0) {
    angle+=2*PI;
  }

  if (lados==false) {
    var newx=xP+speed*cos(angle)*avanza;
    var newy=yP+speed*sin(angle)*avanza;
  }
  if (lados==true) {
    var newx=xP+speed*cos(angle-PI/2)*avanza;
    var newy=yP+speed*sin(angle-PI/2)*avanza;
  }


  background(255);
  if (keyIsPressed===true) {
    t+=nm;
  }
  if (t>=3.7) {
    nm=-0.61*speed;
  } else if (t<=-3.7) {
    nm=0.61*speed;
  }

  stroke(133, 8, 8 );
  fill(133, 8, 8 );
  rect(0,0,width,600-lookY);

  stroke(173, 84, 7);
  fill(173, 84, 7);
  rect(0,height,width,-300-lookY);
  
  
  //Level 2
  ray(level+2);
  
  //Level 1
  ray(level);
  
  
  fill(0);
  rect(fov*width+500, 600-lookY, 80, 10);
  angle=map(mouseX, 0, 500, 0, 2*PI);
  lookY=mouseY*2.5-300+t;
  if (xP>=(endx-3)&&xP<=(endx+3)&&yP>=(endy-3)&&yP<=(endy+3)) {
    image(win, width/2-win.width/2, height/2-win.height/2);
  }

  for (let i=0; i<2; i++) {
    fill(51);
    stroke(0);
    rect(i*(width-50), 0, 50, height);
    rect(0, i*(height-50), width, 50);
  }
  
   if (nIn==2) {
    image(c4, width/2-266, height-360);
  }
   
  speed=1*(deltaTime/15);
  
  if (matr[parseInt(newx)][parseInt(newy)]>=255) {
    xP=newx;
    yP=newy;
  }
}

function mouseClicked() {

  console.log("¡Disparo!");
  bulletF();
}

function keyPressed() {


  if (keyCode==87) {
    avanza=1;
    lados=false;
  }//Adelante
  if (keyCode==83) {
    avanza=-1;
    lados=false;
  }//Atras
  if (keyCode==65) {
    avanza=1;
    lados=true;
  }//Izquierda
  if (keyCode==68) {
    avanza=-1;
    lados=true;
  }//Derecha
  if (keyCode==49) {
    nIn=1;
  }
  if (keyCode==50) {
    nIn=2;
  }
  if(keyCode==40){
  level++;
  }
  if(keyCode==38){
  level--;
  }
}
function keyReleased() {

  if (keyCode==87) {
    lados=true;
    avanza=0;
  }
  if (keyCode==83) {
    lados=true;
    avanza=0;
  }
  if (keyCode==65) {
    lados=false;
    avanza=0;
  }
  if (keyCode==68) {
    lados=false;
    avanza=0;
  }
}
function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  }
  )
}
