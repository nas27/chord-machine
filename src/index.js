import { chord } from "@tonaljs/chord";
import { note, transpose } from "@tonaljs/tonal";
import { chordType, ChordType, entries } from "@tonaljs/chord-dictionary";
import { Howler, howl } from "howler";

//start video #11 for howler lib

//console.log(transpose('A3','P5'));

//unrelated testing of get request
fetch('https://jsonplaceholder.typicode.com/users/3') 
    .then(response => {                            
        return response.json();
    })
    .then(post => {
             if (post.address.geo.lat < 60.00){
                console.log('latitude less than 60');
             }  
                console.log(post.username);
             
        
    } )
    



const sound = new Howl({
    src: ['./assets/pianosprite.mp3'],
    onload() {
        console.log('sound file loaded');
        soundEngine.initialize();
    },
    onloaderror(e, msg) {
        console.log('error', e, msg);
    }
});

//array for the roots of chords
const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb','B'];

const startNoteSelector = document.querySelector('#start-note');

//const octaveSelector = document.querySelector('#octave');   

const buttons = document.querySelector('.buttons');             

const intervalsInChord = document.querySelector('.intervals-in-chord');

const notesInChord = document.querySelector('.notes-in-chord');

let selectedStartNote = 'C';
//let selectedOctave = '3';
let selectedChord;

const app = {
    initialize(){
        this.setupStartNotes();
        //this.setupOctaves();
        this.setupButtons();
        this.setupEventListeners();
    }, 

    setupStartNotes() {
        startNotes.forEach(noteName => {
            let noteNameOption = this.createElement('option',noteName);
            startNoteSelector.appendChild(noteNameOption);
            
        });
    },

   /* setupOctaves() {
       for(let i = 1; i <= 4; i++) 
       {
        let octaveNumber = this.createElement('option', i);
        octaveSelector.appendChild(octaveNumber);
       }
    },*/

    setupButtons() {
       // const chordEntries = entries();

       
        const chordNames = entries().map(entry => {
            return entry.aliases[0];
        });

        chordNames.forEach(chordName => {
            let chordButton = this.createElement('button',chordName);
            buttons.appendChild(chordButton);
        });
    },

    setupEventListeners(){
        startNoteSelector.addEventListener('change', () =>{
            selectedStartNote = startNoteSelector.value;
            console.log(selectedStartNote); 


        })

       /* octaveSelector.addEventListener('change', () =>{
            selectedOctave = octaveSelector.value;
            console.log(selectedOctave);
        });*/

        buttons.addEventListener('click', (event) =>{
            if(event.target.classList.contains('buttons')){
                //nothing happens if we click inside div but not on a button specifically
                return;
            }
            selectedChord = event.target.innerText;
            this.displayAndPlayChord(selectedChord);   
        });
    },

    displayAndPlayChord(selectedChord){
        let chordIntervals = chord(selectedChord).intervals;
        //format with hyphen instead of csv from array
        intervalsInChord.innerText = chordIntervals.join(' - ');

        //test without specifying the Octave as it doesn't matter
        const startingNoteWithOctave = selectedStartNote;
    
    //    const startingNoteWithOctave = selectedStartNote + selectedOctave;

        let chordNotes = chordIntervals.map(val => {
            return transpose(startingNoteWithOctave, val);
        });

        notesInChord.innerText = chordNotes.join(' - ');
        soundEngine.play(chordNotes);

        console.log(chordNotes);
        console.log(startingNoteWithOctave);
    },


    createElement(elementName, content) {
        let element = document.createElement(elementName);
        element.innerHTML = content;
        return element;
    }
}

const soundEngine = {
    initialize() {
        
        const lengthofNote = 2400;
        //everytime we reach it we will add it to timeindex so it goes to the next one
        let timeIndex = 0;

        //set to 24 bc midi number C set to 24
        //96 is midi number of c7
        for (let i = 24; i<= 96;i++){
            sound['_sprite'][i] = [timeIndex, lengthofNote];//start and end 24,2400
            timeIndex += lengthofNote;
        }
        
    },
    play(soundSequence) {

        const chordMidiNumbers = soundSequence.map(noteName => {
            return noteName().midi;
        });

        sound.volume(0.75);

        chordMidiNumbers.forEach(noteMidiNumber => {
            console.log(noteName,note(noteName).midi);
            sound.play(noteMidiNumber.toString());
        });
        
    }

}

app.initialize();


