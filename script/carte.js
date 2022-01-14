class Game {
  
  arrayCase = [];
  nbReveal = 0;
  caseReveal;

  timer = 200;
  timeout;
  active = true;

  /**
   * timer for the game
   */
   goTimer(){
    document.getElementById("memory__timerValue").textContent = this.timer+'s';
    this.timer -= 1;
    this.timeout = setTimeout(() => {
      if(this.timer >= 0){
        this.goTimer();
      }else{
        // verifGameWin();
        document.getElementById("memory__result").textContent = "Désolé, c'est perdu!"
        document.getElementById("memory__result").classList.add("loose");
        this.active = false;
      }
    },1000);
  }

  /**
  * @param {int} taille
  */
  constructor(taille){
    console.log("Game Init taille : "+taille);
    this.taille = taille;
    for (let i = 0; i < this.taille; i++) {
      this.arrayCase[i] = [];
    }
    this.goTimer();
  }
    /**
  * @param {Case} caseItem 
  * @param {int} x 
  * @param {int} y 
  */
  addCase(caseItem) {
    this.arrayCase[caseItem.returnX()][caseItem.returnY()] = caseItem;
    // console.log(this.arrayCase);
  }

  stopCompteur(){
    clearTimeout(this.timeout);
  }

  reinit(){
    for (let index = 0; index < this.arrayCase.length; index++) {
      for (let j = 0; j < this.arrayCase.length; j++) {
        this.arrayCase[index][j].hidden = false;
      }
    }
    this.timer = 200;
    this.active = true;
    this.caseReveal = null;
    this.nbReveal = 0;
    clearTimeout(this.timeout);
    this.goTimer();
    console.log(this.arrayCase);
  }
  /**
   * return nb card reveal.
   * @returns {int}
   */
  returnNbReveal(){
    return this.nbReveal;
  }

  /**
   * edit value of nb reveal card.
   * @param {int} x 
   */
  setReveal(x){
    this.nbReveal = x;
  }

  /**
   * @param {int} x 
   * @param {int} y 
   * @returns {Case}
   */
  returnCase(x,y){
    return this.arrayCase[x][y];
  }

/**
 * Reverse two cases of game table    
 * @param {int} x 
 * @param {int} y 
 * @param {int} x1 
 * @param {int} y2 
 */
  reverseCase(x,y,x1,y2){
    // console.log(x,y)
    let tmpCase = this.returnCase(x,y);
    tmpCase.editCoordinate(x1,y2);
    this.arrayCase[x][y] = this.arrayCase[x1][y2];
    this.arrayCase[x1][y2].editCoordinate(x,y);
    this.arrayCase[x1][y2] = tmpCase;
  }

  /**
   * 
   * @returns {Case[][]}
   */
  returnArray(){
    return this.arrayCase;
  }

  /**
   * print a game table
   */
  printArray(){
    console.log(this.arrayCase);
  }

  gameWin(){
    return this.arrayCase.every((currentValue) => currentValue.every((current) => current.hidden));
  }

  /**
   * return case reveal in table
   * @returns {Case}
   */
  getCaseReveal(){
    return this.caseReveal;
  }

  /**
   * edit the reveal case
   * @param {Case} revealCase 
   */
  editCaseReveal(caseReveal){
    this.caseReveal = caseReveal;
  }

}

class Case {
  
  /**
 * @param {String} name 
 * @param {int} x 
 * @param {int} y 
 */
  constructor(name, x, y){

    // console.log("Case Init ("+x+","+y+")");
    this.name = name;
    this.x = x;
    this.y = y;
    this.hidden = false;
  }

  /**
 * Edit coordinate of case
 * @param {int} x 
 * @param {int} y 
 */
  editCoordinate(x,y){
    this.x = x;
    this.y = y;
  }

  /**
   * 
   * @returns {String}
   */
  returnName(){
    return this.name;
  }

  /**
   * 
   * @returns {int}
   */
  returnX(){
    return this.x;
  }

  /**
   * 
   * @returns {int}
   */
  returnY(){
    return this.y;
  }
}