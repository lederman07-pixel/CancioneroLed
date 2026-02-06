const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const songEl = document.getElementById("song");

function transpose(step) {
    let text = songEl.innerText;
    text = text.replace(/\[([A-G][#b]?m?(7|maj7|sus2|sus4)?)\]/g, (match, chord) => {
        let root = chord.replace(/m?7?|maj7|sus2|sus4/, "");
        let minor = chord.includes("m") && !chord.includes("maj7");
        let index = notes.indexOf(root);
        if(index === -1) return match;
        let newIndex = (index + step + notes.length) % notes.length;
        let suffix = chord.match(/m?7|maj7|sus2|sus4/) || "";
        return `[${notes[newIndex]}${suffix}]`;
    });
    songEl.innerText = text;
    saveSong(); // guardamos automáticamente cada cambio
}

function saveSong() {
    localStorage.setItem("miCancion", songEl.innerText);
}

function loadSong() {
    const saved = localStorage.getItem("miCancion");
    if(saved) songEl.innerText = saved;
}

// Cargar la canción al iniciar
window.onload = loadSong;