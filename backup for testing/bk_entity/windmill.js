import {entity} from './entity.js';
export class windmill extends entity{
	constructor(cwidth,cheight,webgl){
        super(cwidth,cheight,"../obj/windmill/windmill.json",webgl);
        this.baseUrl = "../obj/windmill/";
    }
    setInitialLook(){
        this.setPerspective();
		//this.moveCamera(0,0,-1);
		this.translate(0,0,-5);
		//this.rotateY(180);
    }
}