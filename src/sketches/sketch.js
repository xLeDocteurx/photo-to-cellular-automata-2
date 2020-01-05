export default function sketch (p5) {
    let canvas = null
    let image
    let button

    const cellSize = 10
    // const greyValues = 2
    const greyValues = 3

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
    	p5.background(0)

  		p5.frameRate(8)
		
		canvas.drop(gotFile)
    }
  
    p5.draw = function() {
        idle()
    }

    function idle() {
    	p5.background(0)

    	// Drop text
	  	p5.fill(255)
	  	p5.noStroke()
	  	p5.textSize(24)
	  	p5.textAlign(p5.CENTER)
	  	p5.text('Drag an image here', p5.width / 2, p5.height / 2)
	 //  	// Or text
	 //  	p5.textAlign(p5.CENTER)
	 //  	p5.text('or', p5.width / 2, p5.height / 2 + 27)
  //   	// Load file button
		// button = p5.createButton('Load an image from your device')
		// button.position(p5.width / 2 - button.width / 2, p5.height / 2 + 40)
		// button.mousePressed(() => console.log('yiha'))

	  	p5.noLoop()
    }

    function loadImage(file) {
		// Create an image DOM element but don't show it
		// const img = p5.createImg(file.data, "Your image").hide()
		image = p5.loadImage(
			file.data,
			(img) => {
				displayImage(img)
				normalizeImage()
			},
			() => {alert('Something went wrong with your file')}
		)
    }

    function displayImage(img) {
    	// Draw the image onto the canvas
		p5.background(255)
		// p5.background(127)

	    img.filter('gray')

		if(img.width > img.height) {
			const ratio = img.height / img.width
	    	img.resize(p5.width, p5.width * ratio)
			p5.image(img, 0, p5.height / 2 - img.height / 2)
		} else {
			const ratio = img.width / img.height
	    	img.resize(p5.height * ratio, p5.height)
			p5.image(img, p5.width / 2 - img.width / 2, 0)
		}
    }

    function normalizeImage() {

		const w = p5.width/cellSize
		const h = p5.height/cellSize

		p5.loadPixels()

		// for (var x = 0; x < p5.width; x++) {   
		// 	for (var y = 0; y < p5.height; y++) {    
		for (var x = 0; x < w; x++) {   
			for (var y = 0; y < h; y++) {    

				// const i = ( x + y * p5.width ) * 4
				const i = ( (x * cellSize) + ((y * cellSize) * p5.width) ) * 4

				const r = p5.pixels[i]
				const g = p5.pixels[i + 1]
				const b = p5.pixels[i + 2]
				const a = p5.pixels[i + 3]

				const newr = Math.round( greyValues * r / 255 ) * ( 255 / greyValues )
				const newg = Math.round( greyValues * g / 255 ) * ( 255 / greyValues )
				const newb = Math.round( greyValues * b / 255 ) * ( 255 / greyValues )
				// const newa = 1

				// const newColor = p5.color(newr, newg, newb, newa)
				const newColor = p5.color(newr, newg, newb)

				drawCell(x * cellSize, y * cellSize, newColor)

				// const newColor = p5.color('red')

				// const errr = r - newr
				// const errg = g - newg
				// const errb = b - newb

				// p5.pixels[i] = p5.red(newColor)
				// p5.pixels[i + 1] = p5.green(newColor)
				// p5.pixels[i + 2] = p5.blue(newColor)
				// p5.pixels[i + 3] = p5.alpha(newColor)
			}
		}

		// p5.updatePixels()
    }

    function drawCell(x, y, color) {
    	p5.fill(color)
    	// p5.strokeWeight(1)
    	// p5.stroke(0)
    	p5.noStroke()
    	p5.rect(x, y, cellSize, cellSize);
    }

    function gotFile(file) {
		// If it's an image file
		if (file.type === 'image') {
			loadImage(file)
		} else {
			alert('Not an image file!')
		}
    }

    function resizeCanvas() {
        const parentWidth = canvas.parent().clientWidth
        const parentHeight = canvas.parent().clientHeight
        p5.resizeCanvas(parentWidth, parentHeight)
    }
    p5.windowResized = function() {
        resizeCanvas()
    }
}