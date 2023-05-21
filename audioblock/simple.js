'use strict';

// Create an instance
let wavesurfer = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    const waveform = document.getElementById("waveform");
    if(waveform == null){
        return;
    }
    wavesurfer = WaveSurfer.create({
        container: waveform,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 200,
        barGap: 3
    });

    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    const elem = document.querySelector("audio");
    wavesurfer.load(elem.currentSrc);

    // Load audio from URL
    // Play button
    //const button = document.querySelector('[data-action="play"]');
    const button = document.getElementById('play');

    button.addEventListener('click', ()=>{
        console.log("hola");
        wavesurfer.playPause.bind(wavesurfer);
    });
});

