export class eventHandler{
    constructor(){
        this.up_key_pressed = false;
        this.down_key_pressed = false;
        this.left_key_pressed = false;
        this.right_key_pressed = false;

        document.onkeydown = (event)=>{
            let e=event||window.event;
            if (e.key == 'ArrowUp') { // up arrow
                this.up_key_pressed = true;
            }
            else if (e.key == 'ArrowDown') { //down arrow
                this.down_key_pressed = true;
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
            }
            else if (e.key == 'ArrowDown') { //down arrow
                this.down_key_pressed = false;
            }
            if (e.key == 'ArrowLeft') { // left arrow
                this.left_key_pressed = false;
            }
            else if (e.key == 'ArrowRight') { //right arrow
                this.right_key_pressed = false;
            }
        }
    }
}