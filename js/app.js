import {game} from './game.js';
export class app{
    render(){
        this.parentDiv = document.createElement("div");
        this.parentDiv.appendChild(new game().render());

        return this.parentDiv;
    }
}

document.getElementById("root").appendChild(new app().render());