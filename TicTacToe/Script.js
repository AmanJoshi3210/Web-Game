let box = document.querySelectorAll(".box");
let Val = "X";

// Handle clicking and toggling between "X" and "O"
box.forEach((items) => {
    items.addEventListener("click", (e) => {
        if (items.innerHTML == "") {
            items.innerHTML = Val;
            Val = Val == "X" ? "O" : "X";
            checkDraw();
            checkWinner(); 
        }
        
    });
});
function checkDraw(){
     //  check if the vlaue is Full or not
     let c=0;
     box.forEach(item => {
         if(item.innerHTML==""){
             c++;
         };
     });
     if(c==0){
        alert("Match Draw");
        resetGame();
     }
}
// Function to check the winner
function checkWinner() {
    const winningCombos = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Iterate through all winning combinations
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (box[a].innerHTML !== "" && box[a].innerHTML === box[b].innerHTML && box[b].innerHTML === box[c].innerHTML) {
            alert(`${box[a].innerHTML} Wins!`);
            resetGame();
        }
    });
}

// Function to reset the game after someone wins
function resetGame() {
    box.forEach((items) => {
        items.innerHTML = "";
    });
    Val = "X"; // Reset to X
}

