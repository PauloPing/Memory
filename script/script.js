tailleJeu = 4;

/**
 * Create a lign inHTML page.
 * @param {Case[]} arrayCaseLigne 
 */
function createLigneHTML(arrayCaseLigne){

}

/**
 * Method for create array game and add that in HTML page.
 * @param {Game} jeu 
 */
function createArrayGame(jeu){
  // test = document.getElementById("memory__jeu");
  for (let i = 0; i < tailleJeu; i++) {
    newLigne = [];
    for (let j = 0; j < tailleJeu; j++) {
      jeu.addCase(new Case("mem"+(parseInt((i * tailleJeu + j) / 2 + 1))+".jpg", i, j));
    }
  }
  // jeu.afficheArray();
}

function main(){
  jeu = new Game(this.tailleJeu);
  createArrayGame(jeu);
}
