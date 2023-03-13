//import { note, interval, transpose } from "@tonaljs/tonal";
//import { chord }    from "@tonaljs/chord";

//console.log(note("Ab4"));
//const myInterval = interval('5P');
//console.log(myInterval);
//console.log(chord('Ebmaj7'));

//array for the roots of chords
const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb','B'];

const startNoteSelector = document.querySelector('#start-note');

const octaveSelector = document.querySelector('#octave');


const app = {
    initialize(){
        this.setupStartNotes();
        this.setupOctaves();
    }, 

    setupStartNotes() {
        startNotes.forEach(noteName => {
            let noteNameOption = this.createElement('option',noteName);
            startNoteSelector.appendChild(noteNameOption);
            
        });
    },

    setupOctaves() {
       for(let i = 1; i <= 7; i++) 
       {
        let octaveNumber = this.createElement('option', i);
        octaveSelector.appendChild(octaveNumber);
       }
    },


    createElement(elementName, content) {
        let element = document.createElement(elementName);
        element.innerHTML = content;
        return element;
    }
}

app.initialize();
