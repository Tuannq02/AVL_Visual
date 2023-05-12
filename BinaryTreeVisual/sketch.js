let bst;
let time = 100;
let num;
let arr = [10];
let arr2 = [10];
let index = 0;
let Tnode = new Node();
let Pnode = new Node();
let RMnode = new Node();
let RMPnode = new Node();
let Xnode = new Node();
let Ynode = new Node();
let Znode = new Node();
let Testnode = new Node();
let Rcase;

function setup() {
  createCanvas(800, 500);
  nodeTemp = new TempNode(6);
  bst = new BST();
  //bst.root = bst.insert(bst.root, 5);
  //bst.root = bst.insert(bst.root, 10);

  //bst.root = bst.insert(bst.root, 3);
  //bst.root = bst.insert(bst.root, 2);
  //bst.root = bst.insert(bst.root, 1);
}

function draw() {
  //Canvas
  background("white");

  //Border
  stroke("#30106b");
  strokeWeight(10);
  noFill();
  rect(0, 0, 800, 500);

  // Title div
  stroke("white");
  strokeWeight(4);
  fill("#30106b");
  rect(7, 7, 786, 50);

  // Title
  fill("White");
  noStroke();
  textSize(28);
  textFont("Helvetica");
  textAlign(CENTER, CENTER);
  text("AVL TREE", 400, 34);
  //Time
  timeUpdate();

  //BST
  bst.visualize(bst.root);
}

function timeReset() {
  time = 0;
}

function timeUpdate() {
  time += 1;
}

function mousePressed() {
  loop();
}

function insertPressed() {
  bst.pathReload(bst.root);
  num = int(document.getElementById("num").value);
  setTimeout(insertTO, 500);

  document.getElementById("num").value = "";
}

function searchPressed() {
  bst.pathReload(bst.root);
  num = int(document.getElementById("num").value);

  //Find node
  Tnode = bst.search(bst.root, num);
  print(typeof Tnode);
  redraw();
  document.getElementById("num").value = "";
}

function deletePressed() {
  bst.pathReload(bst.root);
  num = int(document.getElementById("num").value);

  // Find target node, its parent and right most node
  Tnode = bst.search(bst.root, num);
  Pnode = bst.searchParent(bst.root, num);
  if (bst.countChildNode(Tnode) == 1) {
    if (Tnode.right != null) {
      Tnode.right.green = true;
    } else {
      Tnode.left.green = true;
    }
  }
  // Delete
  setTimeout(deleteTO, 800);

  document.getElementById("num").value = "";
}

function rotatePressed() {
  bst.pathReload(bst.root);

  bst.findUnbalanced(bst.root);
  Xnode = bst.search(bst.root, bst.Uinfo);
  Xnode.red = true;
  bst.resetUinfo();
  //print(bst.Uinfo);
  if (bst.countChildNode(Xnode.left) > bst.countChildNode(Xnode.right)) {
    Ynode = Xnode.left;
  } else {
    Ynode = Xnode.right;
  }
  Ynode.green = true;
  if (bst.countChildNode(Ynode.left) > bst.countChildNode(Ynode.right)) {
    Znode = Ynode.left;
  } else {
    Znode = Ynode.right;
  }
  Znode.blue = true;
  if (
    (Xnode.left == Ynode && Ynode.left == Znode) ||
    (Xnode.right == Ynode && Ynode.right == Znode)
  ) {
    Rcase = 1;
  } else if (
    (Xnode.left == Ynode && Ynode.right == Znode) ||
    (Xnode.right == Ynode && Ynode.left == Znode)
  ) {
    Rcase = 2;
  }

  print("Rcase =" + Rcase);
  if (Rcase == 1) {
    setTimeout(rotateTOcase1, 1000);
    setTimeout(rotateTOinsert, 1500);
  } else if (Rcase == 2) {
    setTimeout(rotateTOcase2, 1000);
    setTimeout(rotateTOinsert, 1500);
  }
}

function insertTO() {
  bst.root = bst.insert(bst.root, num);
  if (bst.isTreeBalanced(bst.root) == false) {
    setTimeout(rotatePressed, 500);
  }
  bst.resetBalance();
}

function deleteTO() {
  if (bst.countChildNode(Tnode) == 0) {
    if (Tnode.info < Pnode.info) {
      Pnode.left = null;
    } else if (Tnode.info > Pnode.info) {
      Pnode.right = null;
    }
  } else if (bst.countChildNode(Tnode) == 1) {
    if (Tnode.info < Pnode.info) {
      if (Tnode.left != null) {
        Tnode.info = Tnode.left.info;
        Tnode.left = null;
      } else if (Tnode.right != null) {
        Tnode.info = Tnode.right.info;
        Tnode.right = null;
      }
    } else if (Tnode.info > Pnode.info) {
      if (Tnode.left != null) {
        Tnode.info = Tnode.left.info;
        Tnode.left = null;
      } else if (Tnode.right != null) {
        Tnode.info = Tnode.right.info;
        Tnode.right = null;
      }
    }
  } else if (bst.countChildNode(Tnode) > 1) {
    RMnode = bst.searchRightMost(Tnode);
    if (RMnode.left != null) {
      Tnode.info = RMnode.info;
      RMnode.info = RMnode.left.info;
      RMnode.left = null;
    } else {
      RMPnode = bst.searchParent(bst.root, RMnode.info);
      Tnode.info = RMnode.info;
      //print(RMPnode.info);
      if (RMPnode.left == RMnode) {
        RMPnode.left = null;
      } else if (RMPnode.right == RMnode) {
        RMPnode.right = null;
      }
    }
  }
  if (bst.isTreeBalanced(bst.root) == false) {
    setTimeout(rotatePressed, 500);
  }
  bst.resetBalance();
}

function rotateTOcase1() {
  arr[index] = Xnode.info;
  index++;
  if (Rcase == 1) {
    arr[index] = Znode.info;
    index++;
    if (Xnode.left != null) {
      if (Xnode.left.info != Ynode.info) {
        arr[index] = Xnode.left.info;
        index++;
      }
    }
    if (Xnode.right != null) {
      if (Xnode.right != Ynode) {
        arr[index] = Xnode.right.info;
        index++;
      }
    }
    if (Ynode.left != null) {
      if (Ynode.left != Znode) {
        arr[index] = Ynode.left.info;
        index++;
      }
    }
    if (Ynode.right != null) {
      if (Ynode.right != Znode) {
        arr[index] = Ynode.right.info;
        index++;
      }
    }
    if (Znode.left != null) {
      arr[index] = Znode.left.info;
      index++;
    }
    if (Znode.right != null) {
      arr[index] = Znode.right.info;
      index++;
    }
  }
  Xnode.info = Ynode.info;
  Xnode.red = false;
  Xnode.green = true;
  Xnode.left = null;
  Xnode.right = null;
  print("Node to add: ");
  for (let i = 0; i < index; i++) {
    print(arr[i]);
  }
}

function rotateTOcase2() {
  arr[index] = Xnode.info;
  index++;
  if (Rcase == 2) {
    arr[index] = Ynode.info;
    index++;
    if (Xnode.left != null) {
      if (Xnode.left.info != Ynode.info) {
        arr[index] = Xnode.left.info;
        index++;
      }
    }
    if (Xnode.right != null) {
      if (Xnode.right != Ynode) {
        arr[index] = Xnode.right.info;
        index++;
      }
    }
    if (Ynode.left != null) {
      if (Ynode.left != Znode) {
        arr[index] = Ynode.left.info;
        index++;
      }
    }
    if (Ynode.right != null) {
      if (Ynode.right != Znode) {
        arr[index] = Ynode.right.info;
        index++;
      }
    }
    if (Znode.left != null) {
      arr[index] = Znode.left.info;
      index++;
    }
    if (Znode.right != null) {
      arr[index] = Znode.right.info;
      index++;
    }
    Xnode.info = Znode.info;
    Xnode.red = false;
    Xnode.green = true;
    Xnode.left = null;
    Xnode.right = null;
    print("Node to add: ");
    for (let i = 0; i < index; i++) {
      print(arr[i]);
    }
  }
}

function rotateTOinsert() {
  for (let i = 0; i < index; i++) {
    bst.insert(bst.root, arr[i]);
  }
  index = 0;
  bst.pathReload(bst.root);
  Xnode.green = true;
}
