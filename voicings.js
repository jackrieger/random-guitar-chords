'use strict';

const strings = 6;
const fret_reach = 5;

let frets = 12;
let isUpperOctave = false;

let string_array = [];
let chords = [];

const chord_container = document.getElementById('chord_container');

const generate_button = document.getElementById('generate_button');
generate_button.addEventListener('click', main);

// const octave_toggle = document.getElementById('octave_toggle');
// octave_toggle.addEventListener('click', toggleUpperOctave);

// function toggleUpperOctave() {
//   if (isUpperOctave === false) {
//     frets = 20;
//     isUpperOctave = true;
//   } else if (isUpperOctave === true) {
//     frets = 12;
//     isUpperOctave = false;
//   }
// }

function init(voicing_amount) {
  // dynamic resize chord_container
  // each chord should add 50px
  if (voicing_amount > 15) {
    const delta = voicing_amount - 15;
    chord_container.style.width = `calc(100% + ${delta * 80}px)`;
  }
  makeVoicings(voicing_amount);
}

function makeVoicings(amount) {
  for (let i = 0; i < amount; i++) {
    const chord = [];

    // this number can be the anchor of the selection
    const initial_fret = Math.floor(Math.random() * frets);

    for (let j = 0; j < strings; j++) {
      let offset = Math.floor(Math.random() * fret_reach);
      let fret_choice = initial_fret + offset;

      if (fret_choice > frets) {
        while (fret_choice > frets) {
          offset = Math.floor(Math.random() * fret_reach);
          fret_choice = initial_fret + offset;
        }
      }

      // random chance of blank fret
      if (Math.random() < 0.3) {
        fret_choice = '-';
      }

      chord.push(fret_choice);
    }
    chords.push(chord);
  }
  printVoicings();
}

function printVoicings() {
  for (let i = 0; i < strings; i++) {
    let str = document.createElement('div');
    // needs a +1 to output 1–6 instead of 0–5
    str.id = 'str' + (i + 1);
    string_array.push(str);
    chord_container.appendChild(str);
  }

  // for each chord, add to strings in order
  for (let i = 0; i < chords.length; i++) {
    for (let j = 0; j < strings; j++) {
      if (chords[i][j] - 9 > 0) {
        string_array[j].innerHTML += chords[i][j] + '----';
      } else {
        string_array[j].innerHTML += chords[i][j] + '-----';
      }
    }
  }
}

function main() {
  string_array = [];
  chords = [];

  chord_container.style.width = '100%';
  chord_container.innerHTML = '';

  const amount = document.getElementById('voicing_amount').value;
  setTimeout(init(amount), 100);
}