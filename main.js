/*
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).

Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/

/*
COSA FARE:
- creare una function che generi le bombe con numeri diversi
- creare una function che generi le celle con numeri in serie
*/

const play = document.querySelector("#btn");
const difficolta = document.querySelector("#difficolta");
play.addEventListener("click", clicked);

// Function che genera le bombe
function bombGenerator(max) {
  let bombs = [];
  do {
    let bomb = Math.floor(Math.random() * max + 1);
    if (!bombs.includes(bomb)) {
      bombs.push(bomb);
    }
  } while (bombs.length < 16);

  console.log(bombs);
  return bombs;
}

function gridGenerator(rows, columns) {
  const cellsNumbers = rows * columns;

  const bombsList = bombGenerator(cellsNumbers);
  const gridContainer = document.querySelector(".grid-container");

  console.log(cellsNumbers);
  gridContainer.style.width = `calc(var(--cell-size) * ${rows})`;
  gridContainer.innerHTML = "";
  // creo ogni cella
  for (let i = 0; i < cellsNumbers; i++) {
    // creo div che rappresenta la cella singola
    const cell = document.createElement("div");
    // aggiungo la classe cella
    cell.classList.add("cell");
    // aggiungo il numero alla cella
    cell.innerHTML = `<span>${i + 1}</span>`;
    gridContainer.appendChild(cell);
    cell.dataset.indice = i + 1;

    // evento click
    let onCellClick = function () {
      if (this.classList.contains("bomb")) {
        return;
      }
      const cellIndex = +this.dataset.indice;
      console.log("Hai cliccato il numero", cellIndex);

      if (bombsList.includes(cellIndex)) {
        cell.classList.add("bomb");

        alert("hai perso");
      } else {
        cell.classList.add("safe");
      }
    };
    cell.addEventListener("click", onCellClick);

    // appendo la cella al contenitore della griglia
  }
}

function clicked() {
  if (difficolta.value === "easy") {
    gridGenerator(10, 10);
    // bombGenerator(100);
    // console.log(bombs);
    // return bombs;
  } else if (difficolta.value === "medium") {
    gridGenerator(9, 9);
    // bombGenerator(81);
    // console.log(bombs);
    // return bombs;
  } else if (difficolta.value === "hard") {
    gridGenerator(7, 7);
    // bombGenerator(49);
    // console.log(bombs);
    // return bombs;
  }
  console.log(difficolta.value, "difficolta");
}
