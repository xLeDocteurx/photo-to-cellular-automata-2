export default function sketch (p5) {
    let canvas = null

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
    	p5.background(0)
		canvas.drop(gotFile)
    }
  
    p5.draw = function() {
        idle()
    }

    function idle() {
    	p5.background(0)
	  	p5.fill(255)
	  	p5.noStroke()
	  	p5.textSize(24)
	  	p5.textAlign(p5.CENTER)
	  	p5.text('Drag an image here', p5.width / 2, p5.height / 2)
	  	p5.noLoop()
    }

    function gotFile(file) {
		// If it's an image file
		if (file.type === 'image') {
			// Create an image DOM element but don't show it
			const img = p5.createImg(file.data, "Your image").hide()
			// Draw the image onto the canvas
    		// p5.background(255)
			p5.image(img, 0, 0, p5.width, p5.height)
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