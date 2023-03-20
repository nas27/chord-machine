import { chord } from "@tonaljs/chord";
import { chordType, entries } from "@tonaljs/chord-dictionary";

//array for the roots of chords
const startNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb','B'];

const startNoteSelector = document.querySelector('#start-note');

const octaveSelector = document.querySelector('#octave');

const buttons = document.querySelector('.buttons');             

const intervalsInChord = document.querySelector('.intervals-in-chord');

let selectedStartNote;
let selectedOctave;
let selectedChord;

const app = {
    initialize(){
        this.setupStartNotes();
        this.setupOctaves();
        this.setupButtons();
        this.setupEventListeners();
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

        octaveSelector.addEventListener('change', () =>{
            selectedOctave = octaveSelector.value;
            console.log(selectedOctave);
        });

        buttons.addEventListener('click', (event) =>{
            if(event.target.classList.contains('buttons')){
                //nothing happens if we click inside div but not on a button specifically
                return;
            }
            selectedChord = event.target.innerText;
            this.displayChordInfo(selectedChord);   
        });
    },

    displayChordInfo(selectedChord){
        let chordIntervals = chord(selectedChord).intervals;
        //format with hyphen instead of csv from array
        intervalsInChord.innerText = chordIntervals.join(' - ');
        console.log(chord(selectedChord));
    },


    createElement(elementName, content) {
        let element = document.createElement(elementName);
        element.innerHTML = content;
        return element;
    }
}

app.initialize();


