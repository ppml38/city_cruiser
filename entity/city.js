import {entity} from './entity.js';

export class city extends entity{
	constructor(cwidth,cheight,webgl,eh,cm,inital_translate_values){
        
        super(cwidth,cheight,"../obj/city/new.json",webgl,eh,cm);
        this.baseUrl = "../obj/city/";

        this.position = [0,0,0];
        this.setInitialLook(
            inital_translate_values.x,
            inital_translate_values.y,
            inital_translate_values.z
        );
	
    }
    
    setInitialLook(x,y,z){
		//this.scale(.5,.5,.5);
        //this.translate(390,0,-100);
        this.translate(x,y,z);
        this.rotateY(-90);
        
    }

    _handleUserInputs(){
        // Must be in the order Translate, rotate xyz, scale
        let speed = 5;
        if(this.event_handler.up_key_pressed===true){
            this.moveCamera(0,0,-1 * speed);
        }
        if(this.event_handler.down_key_pressed===true){
            this.moveCamera(0,0,1* speed);
        }
        if(this.event_handler.left_key_pressed===true){
            this.rotateCamera(.5* speed);
        }
        if(this.event_handler.right_key_pressed===true){
            this.rotateCamera(-.5* speed);
        }
    }
    
}