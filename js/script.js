const notes = {};
notes['D4b'] = 'B3b';
notes['D4'] = 'B3';
notes['E4b'] = 'C4';
notes['E4'] = 'D4b';
notes['F4'] = 'D4';
notes['G4b'] = 'E4b';
notes['G4'] = 'E4';
notes['A4b'] = 'F4';
notes['A4'] = 'G4b';
notes['B4b'] = 'G4';
notes['B4'] = 'A4b';
notes['C5'] = 'A4';
notes['D5b'] = 'B4b';
notes['D5'] = 'B4';
notes['E5b'] = 'C5';
notes['E5'] = 'D5b';
notes['F5'] = 'D5';
notes['G5b'] = 'E5b';
notes['G5'] = 'E5';
notes['A5b'] = 'F5';
notes['A5'] = 'G5b';
notes['B5b'] = 'G5';
notes['B5'] = 'A5b';
notes['C6'] = 'A5';
notes['D6b'] = 'B5b';
notes['D6'] = 'B5';
notes['E6b'] = 'C6';
notes['E6'] = 'D6b';
notes['F6'] = 'D6';
notes['G6b'] = 'E6b';
notes['G6'] = 'E6';
notes['A6b'] = 'F6';

const notePiano = document.getElementById('piano');
const noteSaxophoneContainer = document.getElementById('saxophone');
const carouseContainer = document.querySelector('.glider-track');
const notas = document.querySelectorAll('.tecla');
const vistaHorizontal = document.querySelector('.view-h');
const vistaCompleta = document.querySelector('.view-f');
let record = [];

for(let nota of notas) {
    nota.addEventListener('click', function() {
        let notaTocada = this.dataset.note;
        record.push(notaTocada);
        notePiano.value += notaTocada + ' ';
        mostrarPosicionSaxo(notes[notaTocada], notaTocada);
        const audio = new Audio(`sounds/${notaTocada}.mp3`);
        audio.play();
        glider.refresh(true);
    });
}

notePiano.addEventListener('change', (e) => {
    const input = e.target.value;
    const notesEntered = input.split(' ');
    noteSaxophoneContainer.innerHTML = '';
    for(let note of notesEntered) {
        is_note = note.charAt(0).toUpperCase() + note.slice(1);
        if (notes[is_note]) {
            mostrarPosicionSaxo(notes[is_note], is_note);
        } else {
            console.log('¡Está fuera del rango de notas o no existe!');
        }
    }
});

function mostrarPosicionSaxo(notaSaxo, notaPiano) {
    let figure = 
    `
    <figure>
        <img src="img/${notaSaxo}.png" alt="">
    </figure>
    `
    carouseContainer.innerHTML += figure;
}

function viewFullPosition() {
    const virtualContainer = document.createDocumentFragment();
    for (let i = 0; i < record.length; i++) {
        virtualContainer.appendChild(createElementFullPosition(notes[record[i]], record[i]));
    }
    return virtualContainer;
}

function viewHorizontalPosition() {
    const virtualContainer = document.createDocumentFragment();
    for (let i = 0; i < record.length; i++) {
        virtualContainer.appendChild(createElementHorizontalPosition(notes[record[i]], record[i]));
    }
    return virtualContainer;
}

function createElementHorizontalPosition(saxophoneNote, pianoNote) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.setAttribute('src', `img/${saxophoneNote}.png`);
    figure.appendChild(img);
    return figure;
}

function createElementFullPosition(saxophoneNote, pianoNote) {
    const divLayout = document.createElement('div');
    divLayout.classList.add('col', 's12', 'm4', 'l2');
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    const divImage = document.createElement('div');
    divImage.classList.add('card-image');
    const img = document.createElement('img');
    img.setAttribute('src', `img/${saxophoneNote}.png`);
    const span = document.createElement('span');
    span.classList.add('card-title', 'grey', 'darken-4');
    span.textContent = pianoNote;
    divImage.appendChild(img);
    divImage.appendChild(span);
    divCard.appendChild(divImage);
    divLayout.appendChild(divCard);
    return divLayout;
}

vistaHorizontal.addEventListener('click', () => {
    document.getElementById('carousel').style.visibility = 'visible';
    document.getElementById('saxophone').style.visibility = 'hidden';
    carouseContainer.appendChild(viewHorizontalPosition());
    glider.refresh(true);
    noteSaxophoneContainer.innerHTML = '';
});

vistaCompleta.addEventListener('click', () => {
    document.getElementById('carousel').style.visibility = 'hidden';
    document.getElementById('saxophone').style.visibility = 'visible';
    noteSaxophoneContainer.appendChild(viewFullPosition());
    carouseContainer.innerHTML = '';
});