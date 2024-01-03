const form = document.getElementById('date');
const imgAppoved = `<img src="img/aprovado.png" alt="carinha feliz">`
const imgFailed = `<img src="img/reprovado.png" alt="carinha decepcionado">`
const approved = `<span class="resultado aprovado">Aprovado</span>`
const failed = `<span class="resultado reprovado">reprovado</span>`
const subjects = [];
const notes = [];
let lines = '';
const noteMinima = prompt('Digite a media');

form.addEventListener('submit', e => {
    e.preventDefault();

    addRow();
    refreshTable();
    updateFinishNote();
})

function addRow () {
    const nameSubjects = document.getElementById('materia');
    const note = document.getElementById('note');

    const lowerCaseSubject = nameSubjects.value.toLowerCase().trim();
    if(subjects.includes(lowerCaseSubject)){
        alert('Essa materia já foi adicionada.');
        nameSubjects.value = '';
        note.value = '';
    } else {
        subjects.push(lowerCaseSubject);
        notes.push(parseFloat(note.value));
        console.log('lowerCaseSubject:', lowerCaseSubject);
        console.log('subjects:', subjects);
        
        let line = `<tr>`;
        line += `<td>${nameSubjects.value}</td>`;
        line += `<td>${note.value}</td>`;
        line += `<td>${note.value >=  parseFloat(noteMinima) ? imgAppoved : imgFailed}</td>`;
        line += `</tr>`;
        
        lines += line;

        nameSubjects.value = '';
        note.value = '';
    }
}

function refreshTable () {
    const bodyTable = document.querySelector('tbody')
    bodyTable.innerHTML = lines ;
}

function updateFinishNote() {
    const finalMedia = calcMedia();
    document.getElementById('finalMedia').innerHTML = finalMedia.toFixed(2);
    document.getElementById('resultMedia').innerHTML = parseFloat(finalMedia) >= parseFloat(noteMinima) ? approved : failed;
}

function calcMedia () {
    if(notes.length === 0) {
        return 0
    }
    
    let sumNotes = 0;
    
    for(let i = 0; i < notes.length; i++) {
        sumNotes += notes[i];
    }

    return sumNotes / notes.length;
}