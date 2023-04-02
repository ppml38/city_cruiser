export class webgl{
	constructor(canvas, vertexShader, fragmentShader){
		this.canvas = canvas;
		this.gl =  this.canvas.getContext("webgl");
        if(!this.gl){
            alert("Webgl not supported");
        }
		this.gl.viewport(0, 0, canvas.width, canvas.height);
		//this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		//this.gl.enable(this.gl.CULL_FACE);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.program = this.addShaders(vertexShader, fragmentShader);
		this.gl.useProgram(this.program);
	}
	addAttributes(attributes, program){
		//let uv_length = attributes.uv.length%3===0 ? 3 : 2; //Math.floor(attributes.uv.length/(attributes.position.length/3));
		Object.entries(attributes).map(([name,data])=>{
			let buffer = this.createBuffer(data);
			this.pointBufferToProgram(program, buffer, name);
		});
	}
	createBuffer(bufferData){
		/*
		* Creates new buffer and pour in the vertex coordinates
		*/
		let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(bufferData), this.gl.DYNAMIC_DRAW);
		return buffer;
	}
	pointBufferToProgram(program, buffer, attributeName){
		/*
		* Points the program attribute pointers to actual buffer location
		*/
		let location  = this.gl.getAttribLocation(program,attributeName);
        this.gl.enableVertexAttribArray(location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
		let len=3;
		/*if(attributeName==='uv'){ 
			len = 2;
		}*/
        this.gl.vertexAttribPointer(location,len,this.gl.FLOAT,false,0,0); // Assuming the coordinates to of length 3
	}

	addUniforms(uniforms,program){
		Object.entries(uniforms).map(([name,data])=>{
			let location = this.gl.getUniformLocation(program, name);
			this.gl.uniformMatrix4fv(location, false, data);
		});
	}

	addShader(shaderSource, shaderType){
		let shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader,shaderSource);
        this.gl.compileShader(shader);
		return shader;
	}
	addVertexShader(shaderSource){
		return this.addShader(shaderSource, this.gl.VERTEX_SHADER);
	}
	addFragmentShader(shaderSource){
		return this.addShader(shaderSource, this.gl.FRAGMENT_SHADER);
	}
	addShaders(vertexShader, fragmentShader){
		/*
		* Adding, compiling and linking shader programs
		*/
		let vShader = this.addVertexShader(vertexShader);
		let fShader = this.addFragmentShader(fragmentShader);

		let program = this.gl.createProgram();
        this.gl.attachShader(program, vShader);
        this.gl.attachShader(program, fShader);
        this.gl.linkProgram(program);
		return program;
	}

	isPowerOf2(value) {
		return (value & (value - 1)) === 0;
	}
	
	create1PixelTexture(pixel) {
		const texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		//this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
						new Uint8Array(pixel));
		return texture;
	}
	
	createTexture(url) {
		const texture = this.create1PixelTexture([128, 192, 255, 255]); //half transparent blue
		// Asynchronously load an image
		const image = new Image();
		image.onload=()=>{
			// Now that the image has loaded make copy it to the texture.
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
			this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,this.gl.UNSIGNED_BYTE, image);
		
			// Check if the image is a power of 2 in both dimensions.
			if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
				// Yes, it's a power of 2. Generate mips.
				this.gl.generateMipmap(this.gl.TEXTURE_2D);
			} else {
				// No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
				//added new
				//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				//this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.DEPTH_COMPONENT, 16, 16, 0,
				//	this.gl.DEPTH_COMPONENT, this.gl.UNSIGNED_SHORT, null);
			}
		};
		image.src = url;
		return texture;
	}

	loadTexture(url) {
		const texture = this.gl.createTexture();
		const image = new Image();
	
		image.onload = e => {
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
			
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,this.gl.UNSIGNED_BYTE, image);
	
			this.gl.generateMipmap(this.gl.TEXTURE_2D);

		};
		//this.gl.activeTexture(this.gl.TEXTURE0);
		//this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
	
		image.src = url;
		return texture;
	}

	draw(attributes,uniforms,texture,no_of_vertices){
		this.addAttributes(attributes, this.program);
		this.addUniforms(uniforms, this.program);
		if(texture){
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
			this.gl.uniform1i(this.gl.getUniformLocation(this.program, 'textureID'), 0);
		}
		this.gl.drawArrays(this.gl.TRIANGLES,0,no_of_vertices);
	}
}