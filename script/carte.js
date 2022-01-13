class Game {
  
  arrayCase = [];
  
  /**
  * @param {int} taille
  */
  constructor(taille){
    console.log("Game Init taille : "+taille);
    this.taille = taille;
    for (let i = 0; i < this.taille; i++) {
      this.arrayCase[i] = [];
      // for (let j = 0; j < this.taille; j++) {
      //   this.arrayCase[taille][j] = 0;
      // }
    }
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

  /**
   * @param {int} x 
   * @param {int} y 
   */
  returnCase(x,y){
    return this.arrayCase[x][y];
  }

  afficheArray(){
    console.log(this.arrayCase);
  }
}

class Case {
  
  /**
 * @param {String} name 
 * @param {int} x 
 * @param {int} y 
 */
  constructor(name, x, y){
    console.log("Case Init ("+x+","+y+")");
    this.name = name;
    this.x = x;
    this.y = y;
  }

  returnName(){
    return this.name;
  }

  returnX(){
    return this.x;
  }

  returnY(){
    return this.y;
  }
}