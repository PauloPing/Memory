var tailleJeu = 4;
var nbMix = 100;
var jeu;
/**
 * Create a lign inHTML page with hidden img.
 * @param {Case[][]} arrayCaseLigne 
 * @param {Game} jeu 
 */
function createLigneHTML(arrayCaseLigne, jeu){
  var plateau = document.getElementById("memory__jeu");
  let ligne;
  let img;
  for (let index = 0; index < this.tailleJeu; index++) {
    ligne = document.createElement('div');
    ligne.id = 'ligne'+index;
    ligne.classList.add('ligne');
    for(let i = 0; i < arrayCaseLigne.length; i++){
      img = document.createElement('img');
      img.src = './img/mem_back.jpg';
      img.addEventListener('click', revealImage.bind(null, index,i,jeu), false);
      img.classList.add('imgCase');
      img.id = index+'-'+i;
      ligne.appendChild(img);
    }
    plateau.appendChild(ligne);
  }
}

/**
 * Mix the array to play the game.
 * @param {Game} jeu 
 */
function mixTable(jeu){
  let nb1;
  let nb2;
  for (let index = 0; index < this.nbMix; index++) {
    nb1 = Math.floor(Math.random() * (this.tailleJeu * this.tailleJeu));
    nb2 = Math.floor(Math.random() * (this.tailleJeu * this.tailleJeu));
    jeu.reverseCase(nb1 % this.tailleJeu, parseInt(nb1 / this.tailleJeu), nb2 % this.tailleJeu, parseInt(nb2 / this.tailleJeu));
  }
}

/**
 * Method to reveal img of card item. (onClick function)
 * @param {int} x 
 * @param {int} y 
 * @param {Game} jeu 
 */
function revealImage(x,y,jeu){
  if(jeu.active){
    lastCase = jeu.returnCase(x,y);
    if(!lastCase.hidden){
      jeu.setReveal(jeu.returnNbReveal() + 1);
      nbReveal = jeu.returnNbReveal();
      if(nbReveal == 2 && jeu.caseReveal == lastCase){
        jeu.setReveal(1);
        return;
      }
      if(nbReveal <= 2){
        document.getElementById(x+'-'+y).setAttribute('src', './img/'+jeu.returnCase(x,y).returnName());
        if(nbReveal == 1){
          jeu.editCaseReveal(jeu.returnCase(x,y));
        }else{
          setTimeout(() => {
            caseReveal = jeu.caseReveal;
            lastCase = jeu.returnCase(x,y);
            if(lastCase.returnName() === caseReveal.returnName() && lastCase.hidden == false && caseReveal.hidden == false){
              jeu.editCaseReveal(null);
              lastCase.hidden = true;
              caseReveal.hidden = true;
              document.getElementById(caseReveal.returnX()+'-'+caseReveal.returnY()).classList.remove('imgCase')
              document.getElementById(caseReveal.returnX()+'-'+caseReveal.returnY()).classList.add('imgCaseActive')
              document.getElementById(x+'-'+y).classList.remove('imgCase')
              document.getElementById(x+'-'+y).classList.add('imgCaseActive')
              if(jeu.gameWin()){
                document.getElementById("memory__result").classList.add("win");
                document.getElementById("memory__result").textContent = "Félicitation c'est gagné.";
                jeu.stopCompteur();
              }
            }else{
              document.getElementById(x+'-'+y).setAttribute('src', './img/mem_back.jpg');
              document.getElementById(caseReveal.returnX()+'-'+caseReveal.returnY()).setAttribute('src', './img/mem_back.jpg');
            }
            jeu.setReveal(0);
          }, 1000)
        }
      }
    }
  }
}
/**
 * Method for create array game and add that in HTML page.
 * @param {Game} jeu 
 */
function createArrayGame(jeu){
  for (let i = 0; i < tailleJeu; i++) {
    for (let j = 0; j < tailleJeu; j++) {
      jeu.addCase(new Case("mem"+(parseInt((i * tailleJeu + j) / 2 + 1))+".jpg", i, j));
    }
  }
  mixTable(jeu);
  createLigneHTML(jeu.returnArray(), jeu);
}

function restartGame(){
  for (let i = 0; i < this.tailleJeu; i++) {
    for (let j = 0; j < this.tailleJeu; j++) {
      document.getElementById(i+'-'+j).src = './img/mem_back.jpg';
      document.getElementById(i+'-'+j).classList.remove('imgCaseActive');
      document.getElementById(i+'-'+j).classList.add('imgCase');
    }
    document.getElementById("memory__result").textContent = "";
    document.getElementById("memory__result").classList.remove("win", "loose")
  }
  mixTable(this.jeu);
  this.jeu.reinit();
}

function main(jeu){
  this.jeu = new Game(this.tailleJeu);
  createArrayGame(this.jeu);
  console.log(this.jeu.arrayCase);
}


// if(jeu.returnCase(x,y).hidden == false){
// }
// if(jeu.returnCase(x,y).hidden == false && jeu.getCaseReveal() && jeu.getCaseReveal().hidden == false){
//   if(nbReveal == 1){
//     setTimeout(() => {
//       let caseReveal = jeu.getCaseReveal();
//       if(!(jeu.returnCase(x,y).returnName() === caseReveal.returnName())){
//         document.getElementById(x+'-'+y).setAttribute('src', './img/mem_back.jpg');
//         document.getElementById(caseReveal.returnX()+'-'+caseReveal.returnY()).setAttribute('src', './img/mem_back.jpg');
//         jeu.setReveal(0);
//       }else{
//         jeu.returnCase(x,y).hidden = true;
//         caseReveal.hidden = true;
//         jeu.setReveal(0);
//       }
//       jeu.editCaseReveal(null);
//     }, 1000);
//   }
// }else{
//   jeu.setReveal(jeu.returnNbReveal() + 1);
//   jeu.editCaseReveal(jeu.returnCase(x,y));
// }