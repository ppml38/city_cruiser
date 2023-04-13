import {audio} from './audio.js';
export class eventHandler{
    constructor(){
        this.up_key_pressed = false;
        this.down_key_pressed = false;
        this.left_key_pressed = false;
        this.right_key_pressed = false;
		
		this.horn = new audio("./audio/simple_horn.mp3");
		this.musical_horn = new audio("./audio/bus_horn.mp3");
		this.engine = new audio("./audio/car_engine.wav");
		//this.engine.setVolume(2);

        document.onkeydown = (event)=>{
            let e=event||window.event;
            if (e.key == 'ArrowUp') { // up arrow
                this.up_key_pressed = true;
				this.engine.start();
            }
            else if (e.key == 'ArrowDown') { //down arrow
                this.down_key_pressed = true;
				this.engine.start();
            }
            if (e.key == 'ArrowLeft') { // left arrow
                this.left_key_pressed = true;
            }
            else if (e.key == 'ArrowRight') { //right arrow
                this.right_key_pressed = true;
            }
        }
        document.onkeyup = (event)=>{
            let e=event||window.event;
            if (e.key == 'ArrowUp') { // up arrow
                this.up_key_pressed = false;
				this.engine.stop();
            }
            else if (e.key == 'ArrowDown') { //down arrow
                this.down_key_pressed = false;
				this.engine.stop();
            }
            if (e.key == 'ArrowLeft') { // left arrow
                this.left_key_pressed = false;
            }
            else if (e.key == 'ArrowRight') { //right arrow
                this.right_key_pressed = false;
            }
			else if (e.key === ' '){ //space
				this.horn.play();
			}
			else if (e.key === 'h'){ //space
				this.musical_horn.play();
			}
        }
    }
}