const ANSWER = "DRIVER";
let row = 0;
let col = 0;
let guesses = ["", "", "", "", "", ""];
const game = document.getElementById("game");

for (let i = 0; i < 6; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for (let j = 0; j < 6; j++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = `tile-${i}-${j}`;
        rowDiv.appendChild(tile);
    }
    game.appendChild(rowDiv);
}

document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();
    
    if (/^[A-Z]$/.test(key) && col < 6) {
        guesses[row] += key;
        document.getElementById(`tile-${row}-${col}`).textContent = key;
        col++;
    } else if (e.key === "Backspace" && col > 0) {
        col--;
        guesses[row] = guesses[row].slice(0, -1);
        document.getElementById(`tile-${row}-${col}`).textContent = "";
    } else if (e.key === "Enter" && col === 6) {
        submitGuess();
    }
});

function submitGuess() {
    let guess = guesses[row];

    for (let i = 0; i < 6; i++) {
        let tile = document.getElementById(`tile-${row}-${i}`);
        if (guess[i] === ANSWER[i]) {
            tile.classList.add("correct");
        } else if (ANSWER.includes(guess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (guess === ANSWER) {
        document.getElementById("message").textContent = "🎉 Mazal Tov! You unlocked the birthday gift!";
        document.getElementById("winSound").play();
        return;
    }

    row++;
    col = 0;

    if (row === 6) {
        document.getElementById("message").textContent = "💥 Oops… Better wait for the gift!";
    }
}
