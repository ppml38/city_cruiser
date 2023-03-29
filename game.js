import {city} from '../entity/city.js';
import {car} from '../entity/car.js';
import {webgl} from './webgl.js';
import { eventHandler } from './event_handler.js';
import '../lib/gl-matrix-min.js';
const { mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } = glMatrix;
export class game{

    constructor(){
        this.canvas = document.createElement("canvas");
        //this.canvas.height=600;
        this.canvas.height = window.innerHeight-10; //600;
        this.canvas.width = window.innerWidth-10; //1200;
        //this.canvas.width = 600;
        this.cube;
        this.entities=[];
        this.event_handler = new eventHandler();
        this.cameraMatrix = mat4.create();

        fetch("./shader/vertex_shader.glsl")
        .then((response) => response.text())
        .then((vertexShader) => {
            fetch("./shader/fragment_shader.glsl")
            .then((response) => response.text())
            .then((fragmentShader) => {
                this.webgl = new webgl(
                    this.canvas, 
                    vertexShader, 
                    fragmentShader
                );
                this.entities.push(new car(this.canvas.width, this.canvas.height, this.webgl, this.event_handler, this.cameraMatrix));
                this.entities.push(new city(
                    this.canvas.width, 
                    this.canvas.height, 
                    this.webgl, 
                    this.event_handler, 
                    this.cameraMatrix,
                    {x:390,y:0,z:-100}
                    ));
                this.entities.push(new city(
                    this.canvas.width, 
                    this.canvas.height, 
                    this.webgl, 
                    this.event_handler, 
                    this.cameraMatrix,
                    {x:2550,y:0,z:-100}
                    ));
                this.game_state='ready';
            });
        });
    }
    run(){
        
        if(this.webgl){
            this.entities.map((entity)=>{
                entity.render(this);
            });
        }
        else{
            console.log("webgl not ready");
        }
        requestAnimationFrame(()=>{this.run();});
        
    }
    render(){
        this.run();
        return this.canvas;
    }
}