export default function sketch (p5) {
    let canvas = null
    let image
    let button

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
		// button = p5.createButton('Load an image from your device');
		// button.position(p5.width / 2 - button.width / 2, p5.height / 2 + 40);
		// button.mousePressed(() => console.log('yiha'));

	  	p5.noLoop()
    }

    function loadImage(file) {
		// Create an image DOM element but don't show it
		// const img = p5.createImg(file.data, "Your image").hide()
		image = p5.loadImage(
			file.data,
			(img) => {
				displayImage(img)
			},
			() => {alert('Something went wrong with your file')}
		)
    }

    function displayImage(img) {
    	// Draw the image onto the canvas
		p5.background(255)

		if(img.width > img.height) {
			const ratio = img.height / img.width
			p5.image(img, 0, p5.height / 2 - img.height, p5.width, p5.height * ratio)
		} else {
			const ratio = img.width / img.height
			p5.image(img, p5.width / 2 - img.width, 0, p5.width * ratio, p5.height)
		}


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