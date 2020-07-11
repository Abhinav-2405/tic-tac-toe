const winningConditions = [  
  ["0", "1", "2"],  
  ["3", "4", "5"],
  ["6", "7", "8"], 
  ["0", "3", "6"],  
  ["1", "4", "7"],
  ["2", "5", "8"],
  ['0', "4", "8"],   
  ["2", "4", "6"]  ];

const cells = document.querySelectorAll('.cell');
const btn = document.getElementById('btn');
let humanMatrix = [];
let aiMatrix = [];

// Function checks if current array(array1) is a possible winning Condition(array2)
function checkArrayPresence(array1, array2){
  if( array2.every(element => array1.includes(element))){
      return true;
  }
}
function checkOpenSpot(){
  for (let i =0; i< cells.length; i++){
    if(cells[i].innerHTML === ''){
      return true;
    }
  }
  return false;
}

function checkWin(player){
  // console.log(humanMatrix);
  if (player.length >= 3){
    for (let i = 0; i < winningConditions.length; i++){
        if(checkArrayPresence(player, winningConditions[i])){
          return true;
          // break;
        }    
    }    
  }
  return false;
}
// Clear everything if player wants to replay the game 
function removeAll(){
  for (let  i = 0; i < cells.length; i++){
    cells[i].innerHTML = '';
  }
  humanMatrix = [];
  aiMatrix = [];
  ai();
}
ai();
function human(e){
  if (e.target.innerHTML == ''){
    e.target.innerHTML = 'X';
    // console.log('Hello');
    humanMatrix.push(e.target.id);
    humanMatrix = humanMatrix.sort();
    ai();
  }
  if (checkWin(humanMatrix)){
    alert('You win!!');  
    return;  
  }
  else if (checkWin(aiMatrix)){
    alert('AI wins!!');
    return;
  }
  else if(!checkOpenSpot()){
    alert("It\'s a tie!!");
    return;
  }
}

function ai(){
  let bestMove;
  let bestScore = -Infinity;
  for(let i = 0; i < cells.length; i++){
    if(cells[i].innerHTML == ''){
      // console.log(i);
      cells[i].innerHTML = 'O';
      aiMatrix.push(`${i}`);
      let score = minimax(cells, 0, -Infinity, +Infinity, false);
      aiMatrix.pop(`${i}`);
      // console.log(score);
      cells[i].innerHTML = '';
      if (score > bestScore){
        bestScore = score;
        bestMove = i;
        // console.log(bestMove);
        // console.log(bestScore);
      }
    }
  }
  // console.log(aiMatrix);
  try {
    cells[bestMove].innerHTML = 'O';
    aiMatrix.push(`${bestMove}`);
    // console.log(aiMatrix);
    aiMatrix = aiMatrix.sort();  
   } 
   catch (error) {
     if(!(checkOpenSpot)){
      console.log('Error');
    }
  }
  
}

function minimax(cells, depth, alpha, beta, isMaximising) {
  // console.log(checkOpenSpot())
  
  let point;
  if(checkWin(aiMatrix)) {  
    point = 10;  
    return point;
  }
  else if(checkWin(humanMatrix)){   
    point = -10; 
    return point;
  }
  else if(!checkOpenSpot()){
    
    point = 0;
    // console.log('In the debugger');
    // (cells.forEach(cell => console.log(cell.innerHTML)));
    // debugger;
    return point;
    
  }

  if (isMaximising) {
    let bestScore = -Infinity;
    // console.log('In ismaximising');
    for(let j = 0; j < cells.length; j++){
        // Is the spot available?
      if (cells[j].innerHTML == '') {
        cells[j].innerHTML = 'O';
        // console.log(depth);
        aiMatrix.push(`${j}`);
        let score = minimax(cells, depth + 1, alpha, beta, false);
        aiMatrix.pop(`${j}`);
        cells[j].innerHTML = '';
        bestScore = Math.max(score, bestScore);
        alpha = bestScore;
        if (beta <= alpha){
          break;
        }
      }
    }
    return bestScore;
  }
     
  else {
    let bestScore = Infinity;
    // console.log('In the human part');
    for(let k = 0; k < cells.length; k++){
      // Is the spot available?
      if (cells[k].innerHTML == '') {
        cells[k].innerHTML = 'X';
        // console.log(depth);
        humanMatrix.push(`${k}`);
        let score = minimax(cells, depth + 1, alpha, beta, true);
        humanMatrix.pop(`${k}`);
        cells[k].innerHTML = '';
        bestScore = Math.min(score, bestScore);
        beta = bestScore;
        if (beta <= alpha){
          break;
        }
      }
    }
    return bestScore;
  }
}


btn.addEventListener('click', removeAll);
cells.forEach(cell => cell.addEventListener('click', human));