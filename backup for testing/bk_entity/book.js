import {entity} from './entity.js';
export class book extends entity{
	constructor(cwidth,cheight){
        super(cwidth,cheight,"../obj/book.json");
	}
}