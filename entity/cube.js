import {entity} from './entity.js';
import '../lib/gl-matrix-min.js';
const { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } = glMatrix;

export class cube extends entity{
	constructor(cwidth,cheight,webgl,eh,cm){
        console.log("initing cube");
        super(cwidth,cheight,"../obj/cube/cube.json",webgl,eh,cm);
        this.baseUrl = "../obj/cube/";

        // Position of camera based on cube
        this.cameraOffsetY = 1;
        this.cameraOffsetZ = 3;

        // Speed at which the cube travels
        this.speed = 5;

        this.setInitialLook();
	
    }
    
    setInitialLook(){
        // This sets initial model matrix
        //this.translate(20,-1,-4);
        //this.moveCamera(-20,-1+1,-4+3)
		this.translate(0,-this.cameraOffsetY,-this.cameraOffsetZ);
    }

    handleUserInputs(){
        // Must be in the order Translate, rotate xyz, scale
        if(this.event_handler.up_key_pressed===true){
            this.translate(0,0,-.5 * this.speed);
            this.moveCamera(0,0,-.5 * this.speed);
        }
        if(this.event_handler.down_key_pressed===true){
            this.translate(0,0,.5 * this.speed);
            this.moveCamera(0,0,.5 * this.speed);
        }
        if(this.event_handler.left_key_pressed===true){
            /**
             * We need to rotate the cube and also place the camera behind the cube
             * in correct offset.
             */
            // Rotate the cube
            this.rotateY(0.5 * this.speed);
            // Set camera matrix same as cube model matrix
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            // move camera back to offset, so that its behind the cube.
            this.moveCamera(0,this.cameraOffsetY, this.cameraOffsetZ);
            
        }
        if(this.event_handler.right_key_pressed===true){
            /*  The perfect one, this rotates the camera, on its current position.
            this.rotateCamera(-.5 * speed);
            this.rotateY(-0.5 * speed);
            */
            this.rotateY(-0.5 * this.speed);
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            this.moveCamera(0,this.cameraOffsetY, this.cameraOffsetZ);

        }
    }
    
}