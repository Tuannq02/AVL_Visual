class Node {
  constructor(info, x, y) {
    this.info = info;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.red = false;
    this.blue = false; //#2a9df4
    this.green = false; //#3DEC55
    this.Uinfo;
  }

  isDisabled() {
    return (
      (this.left != null && this.right == null) ||
      (this.left == null && this.right != null)
    );
  }

  show() {
    //Node line between parent and children
    if (this.left != null) {
      stroke(0);
      strokeWeight(2);
      line(this.x, this.y, this.left.x, this.left.y);
    }
    if (this.right != null) {
      stroke(0);
      strokeWeight(2);
      line(this.x, this.y, this.right.x, this.right.y);
    }

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

    if (this.red == true) {
      //Highlight path
      this.outlineRed();
    } else if (this.blue == true) {
      //Highlight path
      this.outlineBlue();
    } else if (this.green == true) {
      //Highlight path
      this.outlineGreen();
    }
  }

  showNoLine() {
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

    if (this.red == true) {
      //Highlight path
      this.outlineRed();
    } else if (this.blue == true) {
      //Highlight path
      this.outlineBlue();
    } else if (this.green == true) {
      //Highlight path
      this.outlineGreen();
    }
  }

  clearPath() {
    this.red = false;
    this.blue = false;
    this.green = false;
  }

  outlineRed() {
    this.blue = false;
    this.green = false;
    stroke("red");
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, 40);
  }

  outlineBlue() {
    this.red = false;
    this.green = false;
    stroke("#00BFFF");
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, 40);
  }

  outlineGreen() {
    this.blue = false;
    this.red = false;
    stroke("#7CFC00");
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, 40);
  }
}
