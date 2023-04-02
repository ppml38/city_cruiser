import '../lib/gl-matrix-min.js';
const { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } = glMatrix;
export class entity{
	constructor(canvas_width,canvas_height,url, webgl, event_handler, cameraMatrix){
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;
		this.webgl = webgl;

		this.event_handler = event_handler;

		this.materials=[];
		
		this.viewMatrix = mat4.create();
		this.modelMatrix = mat4.create();
		this.cameraMatrix = cameraMatrix;
		this.projectionMatrix = mat4.perspective(mat4.create(), 75 * Math.PI/180, this.canvas_width/this.canvas_height,1,4000);
		this.vpMatrix = mat4.create();
		this.mvpMatrix = mat4.create();

		this.textures={};
		
		this.init(url);
		
	}
	init(url){
		fetch(url)
		.then((response)=>response.json())
		.then((data)=>{
			this.materials = data.geometries;
			this.materials.map((material)=>{
				let data = material.data;
				if(!data.texture){
					this.textures[data.texture]=this.webgl.create1PixelTexture([128, 192, 255, 255]);
				}
				else{
					this.textures[data.texture]=this.webgl.createTexture(`${this.baseUrl}${data.texture}`);
				}

				/* color fill up
				if(!data.color){
					for(let i=0;i<data.position/3;i++){
						data.color = data.color.concat([1,1,1]);
					}
					//data.color=[1,1,1]; // defaulting to white
				}*/
				 //texture coordinates
				if (!data.uv) {
					data.uv=[];
					for(let i=0;i<data.position.length/3;i++){
						data.uv = data.uv.concat([0,0,0]);
					}
				//data.uv = [0, 0];
				}
				/*if(data.uv.length!=data.position.length){
					let n = (data.position.length - data.uv.length)/3;
					for(let i=0;i<n;i++){
						data.uv = data.uv.concat([0,0,0]);
					}
				}*/
			/*
				if (!data.normal) {
				// we probably want to generate normals if there are none
				for(let i=0;i<data.position/3;i++){
					data.normal = data.normal.concat([0,0,1]);
				}
				//data.normal = [0, 0, 1];
				}*/
			});
			this.state="ready";
		});
	}
	randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    }

	translate(x,y,z){
		mat4.translate(this.modelMatrix, this.modelMatrix, [x,y,z]);
	}

	moveCamera(x,y,z){
		mat4.translate(this.cameraMatrix, this.cameraMatrix, [x,y,z]);
	}
	degToRadian(d){
		return Math.PI/180 * d;
	}
	rotateCamera(degree){
		mat4.rotateY(this.cameraMatrix, this.cameraMatrix, Math.PI/180 * degree);	
	}
	scale(x,y,z){
		mat4.scale(this.modelMatrix, this.modelMatrix, [x,y,z]);
	}
	rotateX(degree){
		mat4.rotateX(this.modelMatrix, this.modelMatrix, Math.PI/180 * degree);
	}
	rotateY(degree){
		mat4.rotateY(this.modelMatrix, this.modelMatrix, Math.PI/180 * degree);
	}
	rotateZ(degree){
		mat4.rotateZ(this.modelMatrix, this.modelMatrix, Math.PI/180 * degree);
	}

	handleUserInputs(){
		// to be filled in by child classes

		// Must be in the order Translate, rotate xyz, scale
	}
	prepareMatrices(){
		// Camera and model matrices will be manipulated by user inputs before coming in.
		mat4.invert(this.viewMatrix, this.cameraMatrix);
		mat4.multiply(this.vpMatrix, this.projectionMatrix, this.viewMatrix);
		mat4.multiply(this.mvpMatrix, this.vpMatrix, this.modelMatrix);
	}
	render(game){
		if(this.state!=='ready'){
			console.log("not ready");
			return;
		};
		this.handleUserInputs();
		this.prepareMatrices();
		this.materials.map((material)=>{
			let data = material.data;
			game.webgl.draw(
				{
					'position':data.position,
					//'color':data.color,
					'uv':data.uv,
					//'normal':data.normal
				}, 
				{
					'matrix':this.mvpMatrix,
					//'normalMatrix':this.normalMatrix,
				}, 
				this.textures[data.texture],
				data.position.length/3
				);
		});
	}
}