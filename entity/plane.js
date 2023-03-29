import {entity} from './entity.js';

export class plane extends entity{
	constructor(cwidth,cheight,webgl,eh,cm){
        
        super(cwidth,cheight,"../obj/plane/plane.json",webgl,eh,cm);
        this.baseUrl = "../obj/plane/";

        this.setInitialLook();
	
    }
    
    setInitialLook(){
		//this.moveCamera(0,2,12);
        this.translate(0,-2,0);
        this.scale(12,1,12); // expanding in x and z axis, keeping y as it is (1 because for multiplication if we put 0 it makes it 0)
    }

    _handleUserInputs(){
        // Must be in the order Translate, rotate xyz, scale

        if(this.event_handler.up_key_pressed===true){
            this.moveCamera(0,0,-.5);
        }
        if(this.event_handler.down_key_pressed===true){
            this.moveCamera(0,0,.5);
        }
        if(this.event_handler.left_key_pressed===true){
            this.rotateCamera(.5);
        }
        if(this.event_handler.right_key_pressed===true){
            this.rotateCamera(-.5);
        }
    }
    
}