import {entity} from './entity.js';
import '../lib/gl-matrix-min.js';
const { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } = glMatrix;

export class car extends entity{
	constructor(cwidth,cheight,webgl,eh,cm){
        super(cwidth,cheight,"./obj/car/car.json",webgl,eh,cm);
        this.baseUrl = "./obj/car/";

        // Position of camera based on cube
        this.cameraOffsetY = 0;
        this.cameraOffsetZ = 125;

        // Speed at which the cube travels
        this.speed = 40;
        this.steering_speed=5;


        //Variable to check for steering threshold breach, to check if we can start moving the camera.
        this.steeringMinimumThreshold = 5;
        this.stepThresholdLevel = 1;
        this.currentThresholdLevel = 0;

        // stats to position camera accordingly during a turn.
        this.maximum_steering_angle = 50; //MUST be the multiple of step below else will cause shake
        this.step_steering_angle = 5;
        this.current_steering_angle = 0;
        this.steering = '';

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

    isTurnThresholdBreached(timeFactor){
        // Threshold to decide if we should move camera or not, while the car started turning.
        // until this threshold breached, turn will be instant, once breached, camera will start showing the car movement.
        if(this.currentThresholdLevel<this.steeringMinimumThreshold){
            this.currentThresholdLevel+=(this.stepThresholdLevel*timeFactor);
            return false;
        }
        return true;
    }

    handleUserInputs(timeFactor){
        // Must be in the order Translate, rotate xyz, scale
        let can_turn = false;
        let reverse = 1;
		
		//console.log(timeFactor);
		this.speed=timeFactor*40;
		this.steering_speed = timeFactor*5;
		//console.log(`speed: ${this.speed}`);
		
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

        if(this.event_handler.left_key_pressed===true){
            if(!can_turn){
                return;
            }

            /**
             * We need to rotate the cube and also place the camera behind the cube
             * in correct offset.
             */
             if(this.isTurnThresholdBreached(timeFactor) && (this.steering==='' || this.steering==='left')){
                     this.steering = 'left';
                     this.current_steering_angle = Math.max(-this.maximum_steering_angle, this.current_steering_angle-this.step_steering_angle);
            }
            // Rotate the cube
            this.rotateY(0.5 * this.steering_speed * reverse);
            // Set camera matrix same as cube model matrix
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            // move camera back to offset, so that its behind the cube.
            this.moveCamera(this.current_steering_angle,this.cameraOffsetY, this.cameraOffsetZ);
            
        }
        if(this.event_handler.right_key_pressed===true){
            if(!can_turn){
                return;
            }
            /*  The perfect one, this rotates the camera, on its current position.
            this.rotateCamera(-.5 * speed);
            this.rotateY(-0.5 * speed);
            */
            if(this.isTurnThresholdBreached(timeFactor) && (this.steering==='' || this.steering==='right')){
                 this.steering = 'right';
                 this.current_steering_angle = Math.min(this.maximum_steering_angle, this.current_steering_angle+this.step_steering_angle);
            }
           //this.rotateCamera(1);
            this.rotateY(-0.5 * this.steering_speed * reverse);
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            this.moveCamera(this.current_steering_angle,this.cameraOffsetY, this.cameraOffsetZ);

        }
        if(this.event_handler.left_key_pressed!==true && this.event_handler.right_key_pressed!==true && this.current_steering_angle!==0){
            this.steering = '';
            this.currentThresholdLevel = 0;
            if(this.current_steering_angle<0){
                this.current_steering_angle += this.step_steering_angle;
            }
            else{
                this.current_steering_angle -= this.step_steering_angle;
            }
            mat4.multiply(this.cameraMatrix, this.modelMatrix, mat4.identity(this.cameraMatrix));
            this.moveCamera(this.current_steering_angle,this.cameraOffsetY, this.cameraOffsetZ);
        }
		if(this.event_handler.left_key_pressed!==true && this.event_handler.right_key_pressed!==true){
			this.currentThresholdLevel = 0;
		}
    }
    
}