/*var input = document.getElementById('file_input');
*/
var img;
//var  ;
var canva;

var scalefactor = 10;
var canvassqrsize = 500;
var fr = 8;
var imgratio;
//var surface;
var newwidth;
var newheight;
var w;
var h;
var rgbFactor = 2;

var alivesc = 0;
var deadsc = 0;

var cells = [];

var cellstext = [];



/*function preload() {
  
}*/

function setup() {
	
  canva = createCanvas(100,100);
  canva.parent('in'); 
  frameRate(fr);

//////////////////////////////////////////////
  noLoop();
}

function step0(input) {

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#file_img')
        .attr('src', e.target.result);
        img = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);

  setTimeout("step1a()", 50);
    
}

function draw() {
  
  step2a();
  step2b();
}

function step1a() {

  var element = document.getElementById("file_img");
 
	if (element.width > element.height){
		imgratio = element.width / element.height;
		resizeCanvas(canvassqrsize, canvassqrsize / imgratio);
	} else {
		imgratio = element.height / element.width;
		resizeCanvas(canvassqrsize / imgratio, canvassqrsize);
	}


  loadImage(img, function(img) {
    
  newwidth = img.width * ( width / img.width );
  newheight = img.height * ( height / img.height );

/////////////////////////////////////////
//////////////////////////////////////////
/////////////////////////////////////////

  /*if (element.height > element.width){
    newheight = img.height * ( ( height * imgratio ) / img.height );
  }*/
//    img.filter('gray');
//var centering = 0 - ((newheight - height) / 2);

    img.resize(newwidth, newheight);
    image(img, 0, 0, newwidth, newheight);
  });

  loadImage(img, function(img) {

  w = width/scalefactor;
  h = height/scalefactor;
//  console.log("w : " + w + " / h : " + h);
//var cent = centering / scalefactor;

    img.filter('gray');
    img.resize(w, h);
    image(img, 0, 0/*, w, h*/);
   
  });


  document.getElementById("file_img").style.display = "none";
  
  setTimeout("step1b()", 250);
}

function step1b() {

  loadPixels();
  
  for (var x = 0; x < w; x++) {   
    for (var y = 0; y < h; y++) {    
    
      var i = ( x + y * width ) * 4;
      
      var r = pixels[i];
      var g = pixels[i + 1];
      var b = pixels[i + 2];
      var a = pixels[i + 3];
      
      var newr = round( rgbFactor * r / 255 ) * ( 255 / rgbFactor );
      var newg = round( rgbFactor * g / 255 ) * ( 255 / rgbFactor );
      var newb = round( rgbFactor * b / 255 ) * ( 255 / rgbFactor );
//    var newa = 1;
      
      var newcolor = color(newr, newg, newb);
      
      var errr = r - newr;
      var errg = g - newg;
      var errb = b - newb;
      
      pixels[i] = red(newcolor);
      pixels[i + 1] = green(newcolor);
      pixels[i + 2] = blue(newcolor);
      pixels[i + 3] = alpha(newcolor);
    }
  }
  
  updatePixels();  

  setTimeout("step1c()", 250);
  
}

function step1c() {

  loadPixels();
  
  for (var x = 0; x < w; x++) {   
    for (var y = 0; y < h; y++) {    
    
      var i = ( x + y * width ) * 4;
      
      var r = pixels[i];
      var g = pixels[i + 1];
      var b = pixels[i + 2];
      var a = pixels[i + 3];
      
      var newr2 = round( r / 200 ) * 255;
      var newg2 = round( g / 200 ) * 255;
      var newb2 = round( b / 200 ) * 255;
//    var newa = 1;
      
      var newcolor = color(newr2, newg2, newb2);
      
      var errr = r - newr2;
      var errg = g - newg2;
      var errb = b - newb2;
      
      pixels[i] = red(newcolor);
      pixels[i + 1] = green(newcolor);
      pixels[i + 2] = blue(newcolor);
      pixels[i + 3] = alpha(newcolor);
    }
  }
  
  updatePixels();

  setTimeout("step1d()", 250);
  
}

function step1d() {

    var pink = color(255, 105, 180);
    var newcolor = pink;

  loadPixels();
  
  for (var x = 0; x < w; x++) {   
    for (var y = 0; y < h; y++) {    
    
      var i = ( x + y * width ) * 4 /* * scalefactor*/;
      var ix = x * scalefactor;
      var iy = y * scalefactor;

      var r = pixels[i];
      var g = pixels[i + 1];
      var b = pixels[i + 2];
//      var a = pixels[i + 3];
      newcolor = color(r, g, b);


      fill(newcolor);
//      noStroke();
      rect(ix, iy, scalefactor, scalefactor);

      var alive;
      var alive_neighboors;
      if (red(newcolor) <  127) {
        alive = 1;
        alivesc += 1;
      } else {
        alive = 0;
        deadsc += 1;
      }

      cells[cells.length] = [ix, iy, alive, alive_neighboors];

    }
  }

  document.getElementById("step0").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function step2a() {

  //var element = document.getElementById("step3");
  // Comptage des voisins
  alivesc = 0;
  deadsc = 0;

  for (var i = 0; i < cells.length; i++) {
    
  /*  var alive = cell[2];
    var alive_neighboors = 0;
    var black = color(0,0,0);
    var white = color(255,255,255);
    var newcolor; */

////////////////////////////////ddd
var newfactor;
//newfactor = h;
if (w > h) {
  newfactor = h;
} else /*if (w < h)*/ {
//  newfactor = w;
  newfactor = h;
}/* else if (w = h) {
  newfactor = h;
}*/
    var index_lu = i - 1 - newfactor;
    var index_cu = i + 0 - newfactor;
    var index_ru = i + 1 - newfactor;

    var index_lm = i - 1;
    var index_rm = i + 1;

    var index_lb = i - 1 + newfactor;
    var index_cb = i + 0 + newfactor;
    var index_rb = i + 1 + newfactor;

    var lu = 0, cu = 0, ru = 0, lm = 0, rm = 0, lb = 0, cb = 0, rb = 0;

    if (cells[index_lu]) {
    lu = cells[index_lu][2];
    }
    if (cells[index_cu]) {
    cu = cells[index_cu][2];
    }
    if (cells[index_ru]) {
    ru = cells[index_ru][2];
    }

    if (cells[index_lm]) {
    lm = cells[index_lm][2];
    }
    if (cells[index_rm]) {
    rm = cells[index_rm][2];
    }

    if (cells[index_lb]) {
    lb = cells[index_lb][2];
    }
    if (cells[index_cb]) {
    cb = cells[index_cb][2];
    }
    if (cells[index_rb]) {
    rb = cells[index_rb][2];
    }

    var alive_neighboors = lu + cu + ru + lm + rm + lb + cb + rb;

    cells[i][3] = alive_neighboors;

/*    var diagx = "cell[" + i + "][" + cells[i][2] + ", " + cells[i][3] + "]<br>" +
    "voisin[" + lu + "][" + cells[index_lu][2] + "]<br>" +
    "voisin[" + cu + "][" + cells[index_cu][2] + "]<br>" +
    "voisin[" + ru + "][" + cells[index_ru][2] + "]<br>" +
    "voisin[" + lm + "][" + cells[index_lm][2] + "]<br>" +
    "voisin[" + rm + "][" + cells[index_rm][2] + "]<br>" +
    "voisin[" + lb + "][" + cells[index_lb][2] + "]<br>" +
    "voisin[" + cb + "][" + cells[index_cb][2] + "]<br>" +
    "voisin[" + rb + "][" + cells[index_rb][2] + "]<br>" +
    "<br>"
    ;
  element.appendChild(diagx);   */


      if (cells[i][2] == 1) {
        alivesc += 1;
      } else if (cells[i][2] == 0) {
        deadsc += 1;
      }

  }

/*  for (var x = 0; x < w; x++) {   
    for (var y = 0; y < h; y++) {    
    
      var i = ( x + y * width ) * 4;
      var ix = x * scalefactor;
      var iy = y * scalefactor;
      var black = color(0,0,0);
      var white = color(255,255,255);
      var newcolor;
      var alive;
      var alive_neighboors;
      cells[i] = [ix, iy, alive, alive_neighboors];
//      fill(newcolor);
//      noStroke();
//      rect(ix, iy, scalefactor, scalefactor);
    }
  }*/

}

function step2b() {

    var black = color(0,0,0);
    var white = color(255,255,255);
    var newcolor;

  // Update de la cellule

  for (var i = 0; i < cells.length; i++) {
//  for each (var cell in cells) {
    
    var alive = cells[i][2];
    var alive_neighboors = cells[i][3];

    if (alive == 0 && alive_neighboors == 3) {
      alive = 1;
    } else if (alive == 1 && alive_neighboors < 2) {
      alive = 0;
    } else if (alive == 1 && alive_neighboors > 3) {
      alive = 0;
    } /* else if (alive = 1) {
      if (alive_neighboors == 3) {
        alive = 1;
      }
      else if (alive_neighboors == 3) {
        alive = 1;
      }
    } */
    if (alive == 1) {
      newcolor = black;
    } else {
      newcolor = white;
    }
    fill(newcolor);
//    noStroke();
    rect(cells[i][0], cells[i][1], scalefactor, scalefactor);



    cells[i][2] = alive;
    cells[i][3] = alive_neighboors;
  }
}

function step2c() {
  loop();
}