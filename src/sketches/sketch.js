export default function sketch (p5) {
    let canvas = null
    let image
    let inputButton
    let launchButton

    let cells

    const cellSize = 10
    // const greyValues = 2
    const greyValues = 3
    const colorThreshold = 150
    // const colorThreshold = 200

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
    	p5.background(0)

  		p5.frameRate(8)
		
		canvas.drop(gotFile)

        idle()
    }
  
    p5.draw = function() {
        // console.log('draw !')

        drawFrame()
    }

    function idle() {
    	p5.background(0)

    	// Drop text
	  	p5.fill(255)
	  	p5.noStroke()
	  	p5.textSize(24)
	  	p5.textAlign(p5.CENTER)
	  	p5.text('Drag an image here', p5.width / 2, p5.height / 2)
	  	// // Or text
	  	// p5.textAlign(p5.CENTER)
	  	// p5.text('or', p5.width / 2, p5.height / 2 + 27)
		// // Load file button
		// inputButton = p5.createButton('Load an image from your device')
		// inputButton.position(p5.width / 2 - inputButton.width / 2, p5.height / 2 + 40)
		// inputButton.mousePressed(() => console.log('yiha'))

	  	p5.noLoop()
    }

    function drawBackFrame() {
        if(cells) {
			cells.forEach((col) => {
				col.forEach((cell) => {
					cell.recoverState()
					cell.draw()
				})
			})
        }
    }

    function drawFrame() {
        if(cells) {
			cells.forEach((col) => {
				col.forEach((cell) => {
					cell.computeNextState()
				})
			})
			cells.forEach((col) => {
				col.forEach((cell) => {
					cell.overwriteState()
					cell.draw()
				})
			})
        }
    }

    function loadImage(file) {
		// Create an image DOM element but don't show it
		// const img = p5.createImg(file.data, "Your image").hide()
		image = p5.loadImage(
			file.data,
			(img) => {
				displayImage(img)
				computeImage()
	  			p5.noLoop()

				launchButton = p5.createButton('Launch !')
				launchButton.position(20,20)
				launchButton.mousePressed(() => p5.loop())

				// buttona = p5.createButton('previous frame')
				// buttona.position(20, 20)
				// buttona.mousePressed(() => drawBackFrame())

				// buttonb = p5.createButton('next frame')
				// buttonb.position(buttona.width + 40, 20)
				// buttonb.mousePressed(() => drawFrame())

				// p5.loop()
			},
			() => {alert('Something went wrong with your file')}
		)
    }

    function loadFromInput(input) {

		let img
	    const reader = new FileReader()
	    reader.onload = function (e) {
	      // $('#file_img')
	      // getElementById('#file_img')
	      //   .attr('src', e.target.result)
	        img = e.target.result
	    }
	    reader.readAsDataURL(input.files[0])

		setTimeout("step1a()", 50)
		    
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

    function computeImage() {

		const w = p5.width/cellSize
		const h = p5.height/cellSize

		cells = []

		p5.loadPixels()

		// for (var x = 0; x < p5.width; x++) {   
		// 	for (var y = 0; y < p5.height; y++) {    
		for (var x = 0; x < w; x++) {
			cells.push([])
			for (var y = 0; y < h; y++) {    
				// const i = ( x + y * p5.width ) * 4
				const i = ( (x * cellSize) + ((y * cellSize) * p5.width) ) * 4

				const r = p5.pixels[i]
				const g = p5.pixels[i + 1]
				const b = p5.pixels[i + 2]
				const a = p5.pixels[i + 3]

				// const newr = Math.round( greyValues * r / 255 ) * ( 255 / greyValues )
				// const newg = Math.round( greyValues * g / 255 ) * ( 255 / greyValues )
				// const newb = Math.round( greyValues * b / 255 ) * ( 255 / greyValues )
				// const newColor = p5.color(newr, newg, newb)

			    const newr2 = Math.round( r / colorThreshold ) * 255
			    const newg2 = Math.round( g / colorThreshold ) * 255
			    const newb2 = Math.round( b / colorThreshold ) * 255
			    const newColor = p5.color(newr2, newg2, newb2)

			    const alive = newColor.levels[0] < 127 ? true : false
    			cells[x].push(new Cell(x, y, alive))
			}
		}

		cells.forEach((col) => {
			col.forEach((cell) => {
				cell.draw()
			})
		})

		// console.log('cells', cells)
		// p5.updatePixels()
    }

    class Cell {
    	constructor(x, y, alive) {
    		this.x = x
    		this.y = y
    		this.alive = alive
    		this.aliveNext = null
    		this.alivePrevious = []
    	}

    	get color() {
    		return this.alive ? p5.color(0) : p5.color(255)
    	}

    	get numberOfAliveNeighboors() {
    		// const xMinus = this.x < 1 || this.x - 1 > cells.length - 1 ? cells.length - 1 : this.x - 1
    		// const xPluss = this.x > cells.length - 2 ? 0 : this.x + 1
    		// const yMinus = this.y < 1 || this.y - 1 > cells[this.x].length - 1 ? cells[this.x].length - 1 : this.y - 1
    		// const yPluss = this.y > cells[this.x].length - 2 ? 0 : this.y + 1

    		const xMinus = this.x < 1 || this.x - 1 > cells.length - 1 ? cells.length - 1 : this.x - 1
    		const xPluss = this.x > cells.length - 2 ? 0 : this.x + 1
    		const yMinus = this.y < 1 || this.y - 1 > cells[this.x].length - 1 ? cells[this.x].length - 1 : this.y - 1
    		const yPluss = this.y > cells[this.x].length - 2 ? 0 : this.y + 1

    		const lu = cells[xMinus][yMinus].alive ? 1 : 0
    		const mu = cells[this.x][yMinus].alive ? 1 : 0
    		const ru = cells[xPluss][yMinus].alive ? 1 : 0
    		const lc = cells[xMinus][this.y].alive ? 1 : 0
    		const rc = cells[xPluss][this.y].alive ? 1 : 0
    		const ld = cells[xMinus][yPluss].alive ? 1 : 0
    		const md = cells[this.x][yPluss].alive ? 1 : 0
    		const rd = cells[xPluss][yPluss].alive ? 1 : 0

    		return lu + mu + ru + lc + rc + ld + md + rd
    	}

    	computeNextState() {
    		const alive_neighboors = this.numberOfAliveNeighboors

    		// if() {

    		// } else if() {

    		// } else if() {

    		// }

		    if (!this.alive && alive_neighboors == 3) {
		      this.aliveNext = true
		    } else if (this.alive && alive_neighboors < 2) {
		      this.aliveNext = false
		    } else if (this.alive && alive_neighboors > 3) {
		      this.aliveNext = false
		    } else {
		    	this.aliveNext = this.alive
		    }
		    //  else {
		    // 	console.log(`Something went wrong at computing the state of cell ${this.x}/${this.y}`)
		    // }
    	}

    	overwriteState() {
    		this.alivePrevious.push(this.alive)
    		this.alive = this.aliveNext
    		this.aliveNext = null
    	}

    	recoverState() {
    		if(this.alivePrevious.length > 0) {
	    		// this.aliveNext = this.alive
	    		this.aliveNext = null
	    		this.alive = this.alivePrevious[this.alivePrevious.length - 1]
	    		this.alivePrevious.pop()
    		}
    	}

    	draw() {
	    	p5.fill(this.color)
	    	// p5.strokeWeight(1)
	    	// p5.stroke(0)
	    	p5.noStroke()
			p5.rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
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