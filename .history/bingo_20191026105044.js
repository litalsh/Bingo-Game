var arr = [],
    randomNumbers = [], //generated random numbers
    bingoColumns = []; //bingo card numbers

    //generate a bingo card random number
function bingoCard(min, max) {
    for (var i = min; i <= max; i++) {
        var cardCell = {
            value: i,
            isChecked: false
        };
        randomNumbers.splice(Math.floor(Math.random() * i), 0, cardCell)
    };
    arr = randomNumbers.splice(0, 5);
    bingoColumns.push(arr);
    arr = [];
    randomNumbers = [];
}

bingoCard(1, 15);
bingoCard(16, 30);
bingoCard(31, 45);
bingoCard(46, 60);
bingoCard(61, 75);
bingoColumns[2][2] = { value: 'free', isChecked: true };

//disply the game card on screen
function createGameCard() {
    for (var i = 0; i < bingoColumns.length; i++) {
        for (var j = 0; j < bingoColumns[i].length; j++) {
            var gameCard = document.querySelector('.game-card'),
                cardCells = document.createElement('div');
            cardCells.classList.add('card-cell');
            gameCard.appendChild(cardCells);
            cardCells.innerHTML = bingoColumns[i][j].value;
        }
    }
}
createGameCard();

//generate random numbers to be compared with card later
var randomSelect = [];
function randomlySelected(min, max) {
    for (var i = min; i <= max; i++) {
        randomSelect.splice(Math.floor(Math.random() * i), 0, i)
    };
}
randomlySelected(1, 75);

//click event for newNumberBtn - add random number to screen
var randomSelectIndex = 0,
    ruffledNumberItem = 0;
function newNumber() {
    var ruffledNumersSide = document.querySelector('.ruffled-numbers');
    ruffledNumberItem = document.createElement('div');
    ruffledNumberItem.classList.add('ruffled-numbers-items');
    ruffledNumersSide.appendChild(ruffledNumberItem);
    ruffledNumberItem.innerHTML = randomSelect[randomSelectIndex];
    randomSelectIndex += 1;
    isMatching();
    didWin();
}
//compare the random numbers with the card numbers
function isMatching() {
    for (var i = 0; i < bingoColumns.length; i++) {
        for (var j = 0; j < bingoColumns[i].length; j++) {
            if (ruffledNumberItem.innerHTML == bingoColumns[i][j].value) {
                bingoColumns[i][j].isChecked = true;
                document.getElementsByClassName('card-cell')[i * bingoColumns.length + j].style.backgroundColor = "blue";
            }
        }
    }
}

//check for a winning sequence
var win = document.querySelector('.winner')
function didWin() {
    for (var i = 0; i < bingoColumns.length; i++) {
          var missCell = false;
          for (var j = 0; j < bingoColumns[i].length; j++) {
              if(bingoColumns[i][j].isChecked==false){
                  missCell = true;
                  break;
              }
          }
          if(missCell == false){
              console.log("won");
              win.classList.remove('hide');
              return;
          }    
    }
        for (var j = 0; j < bingoColumns.length; j++) {
          var missCell = false;
          for (var i = 0; i < bingoColumns[j].length; i++) {
              if(bingoColumns[i][j].isChecked==false){
                  missCell = true;
                  break;
              }
          }
          if(missCell == false){
              console.log("won");
              win.classList.remove('hide');
              return;
          }    
    }
    for (var i = 0; i < bingoColumns.length; i++) {
        var missCell = false;
            if(bingoColumns[i][i].isChecked==false){
                missCell = true;
                break;
            }
        if(missCell == false){
            console.log("won");
            win.classList.remove('hide');
            return;
        }    
  }
  for (var i = 0; i < bingoColumns.length; i++) {
        var missCell = false;
            if(bingoColumns[i][bingoColumns.length-(i+1)].isChecked==false){
                missCell = true;
                break;
            }
        if(missCell == false){
            console.log("won");
            win.classList.remove('hide');
            return;
        }    
  }
    
}



