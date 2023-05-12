class TempNode {
  constructor(info) {
    this.info = info;
    this.x = 50;
    this.y = 50;
    this.time = 0;
    this.moveTime = 90;
  }

  move(xGoal, yGoal) {
    var xStep = (xGoal - this.x) / 20;
    var yStep = (yGoal - this.y) / 20;
    this.x = this.x + xStep;
    this.y = this.y + yStep;
    this.time = this.time + 1;
  }

  show() {
    if (this.time <= 90) {
      //Node circle shape
      stroke("black");
      strokeWeight(3);
      fill("white");
      circle(this.x, this.y, 40);

      //Number inside
      fill(0);
      noStroke();
      textSize(17);
      textFont("Helvetica");
      textAlign(CENTER, CENTER);
      text(this.info, this.x, this.y);
    }
  }
}
