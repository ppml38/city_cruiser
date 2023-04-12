export class audio{
    constructor(filename){
        this.audioContext = new AudioContext();
        this.note;
        fetch(filename)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer =>
            this.audioContext.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
           this.note = decodedAudio;
        })
		this.playing = false; //for the audio that plays continuosly
    }
    play(){
        const aplay = this.audioContext.createBufferSource();
        aplay.buffer = this.note;
        aplay.connect(this.audioContext.destination);
        aplay.start()
    }
	setVolume(volume){
		this.gainNode = this.audioContext.createGain()
		this.gainNode.gain.value = volume;
		this.gainNode.connect(this.audioContext.destination);
	}
	start(){
		
		if(this.playing===false){
			
			this.playing = true;
			
			this.aplay = this.audioContext.createBufferSource();
			this.aplay.buffer = this.note;
			if(this.gainNode){
				this.aplay.connect(this.gainNode);
			}
			else{
				this.aplay.connect(this.audioContext.destination);
			}
			this.aplay.loop = true;
			this.aplay.start();
		}
	}
	stop(){
		if(this.playing===true){
			this.playing = false;
			this.aplay.stop();
		}
	}
}