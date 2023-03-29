import {entity} from './entity.js';
import '../lib/gl-matrix-min.js';
const { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } = glMatrix;

export class car extends entity{
	constructor(cwidth,cheight,webgl,eh,cm){
        console.log("initing car");
        super(cwidth,cheight,"../obj/car/car.json",webgl,eh,cm);
        this.baseUrl = "../obj/car/";

        // Position of camera based on cube
        this.cameraOffsetY = 0;
        this.cameraOffsetZ = 125;

        // Speed at which the cube travels
        this.speed = 40;
        this.steering_speed=6;

        this.setInitialLook();
	
    }
    
    setInitialLook(){
        // This sets initial model matrix
        //this.translate(675,0,600);
        //this.rotateY(-90);
        //this.moveCamera(-20,-1+1,-4+3)
		this.translate(0,-this.cameraOffsetY,-this.cameraOffsetZ);
        //this.scale(.5,.5,.5);
    }

    handleUserInputs(){
        // Must be in the order Translate, rotate xyz, scale
        let can_turn = false;
        let reverse = 1;
        if(this.event_handler.up_key_pressed===true){
            this.translate(0,0,-.25 * this.speed);
            this.moveCamera(0,0,-.25 * this.speed);
            can_turn = true;
        }
        if(this.event_handler.down_key_pressed===true){
            this.translate(0,0,.25 * this.speed);
            this.moveCamera(0,0,.25 * this.speed);
            can_turn = true;
            reverse = -1;
        }
        if(!can_turn){
            return;
        }
        if(this.event_handler.left_key_pressed===true){
            /**
             * We need to rotate the cube and also place the camera behind the cube
             * in correct offset.
             */
            // Rotate the cube
            this.rotateY(0.5 * this.steering_speed * reverse);
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
           //this.rotateCamera(1);
            this.rotateY(-0.5 * this.steering_speed * reverse);
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            this.moveCamera(0,this.cameraOffsetY, this.cameraOffsetZ);

        }
    }
    
}