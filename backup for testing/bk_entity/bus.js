import {entity} from './entity.js';

export class bus extends entity{
	constructor(cwidth,cheight,webgl,eh,vm){
        
        super(cwidth,cheight,"../obj/bus/bus.json",webgl,eh,vm);
        this.baseUrl = "../obj/bus/";
	
    }
    
    setInitialLook(){
		this.scale(.1,.1,.1);
        this.translate(150,0,100);
        //this.rotateY(-90);
        
    }

    handleUserInputs(){
        if(this.event_handler.left_key_pressed===true){
            this.rotateY(1);
            //this.rotateCamera(-1);
        }
        if(this.event_handler.right_key_pressed===true){
            this.rotateY(-1);
            //this.rotateCamera(1);
        }
        if(this.event_handler.up_key_pressed===true){
            this.translate(0,0,-1);
            this.moveCamera(0,0,.5);
        }
        if(this.event_handler.down_key_pressed===true){
            this.translate(0,0,1);
            this.moveCamera(0,0,-.5);
        }
    }
    
}