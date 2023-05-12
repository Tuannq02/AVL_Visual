class BST {
  constructor() {
    this.root = null;
    this.time = 0;
    this.level = 1;
    this.xRoot = width / 2;
    this.yRoot = 100;
    this.balance = 1;
    this.found = 0;
    this.Uinfo = -1;
  }

  isEmpty() {
    return this.root == null;
  }

  clear() {
    this.root = null;
  }

  isRoot(info) {
    return this.root.info == info;
  }

  visualize(root) {
    if (root == null) {
      return;
    } else {
      root.show();
      this.visualize(root.left);
      this.visualize(root.right);
    }
  }

  pathReload(root) {
    if (root == null) {
      return root;
    } else {
      root.red = false;
      root.blue = false;
      root.green = false;
      this.pathReload(root.left);
      this.pathReload(root.right);
    }
    return root;
  }

  insert(root, info) {
    this.pathReload(root);
    if (root == null) {
      root = new Node(info, this.xRoot, this.yRoot);
      root.red = true;
      return root;
    } else if (info < root.info) {
      root.red = true;
      this.level++;
      this.xRoot -= 800 / pow(2, this.level);
      this.yRoot += 50;
      root.left = this.insert(root.left, info);
    } else if (info > root.info) {
      root.red = true;
      this.level++;
      this.xRoot += 800 / pow(2, this.level);
      this.yRoot += 50;
      root.right = this.insert(root.right, info);
    }
    this.level = 1;
    this.xRoot = width / 2;
    this.yRoot = 100;
    return root;
  }

  isExist(root, x) {
    root = this.pathReload(root);
    if (root != null) {
      if (root.info == x) {
        root.red = true;
        return true;
      } else if (x < root.info) {
        this.isExist(root.left, x);
      } else if (x > root.info) {
        this.isExist(root.right, x);
      }
    }
    return false;
  }

  /*search(node, x) {
    if (node != null) {
      if (node.info == x) {
        node.red = true;
        print("not null");
        return node;
      } else if (x < node.info) {
        this.isExist(node.left, x);
      } else if (x > node.info) {
        this.isExist(node.right, x);
      }
    } else {
      print("null");
      return null;
    }
  }*/

  search(root, x) {
    while (root != null) {
      if (root.info == x) {
        root.red = true;
        return root;
      } else if (root.info > x) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
    return null;
  }

  searchUinfo(root, x) {
    while (root != null) {
      if (root.Uinfo == x) {
        return root;
      } else {
        this.searchUinfo(root.left, x);
        this.searchUinfo(root.right, x);
      }
    }
    return null;
  }

  searchParent(root, x) {
    if (this.isRoot(x)) {
      return null;
    } else {
      while (root != null) {
        if (x > root.info && root.right != null) {
          if (root.right.info == x) {
            print("parent right");
            //root.blue = true;
            return root;
          } else {
            root = root.right;
          }
        } else if (x < root.info && root.left != null) {
          if (root.left.info == x) {
            //root.blue = true;
            return root;
          } else {
            root = root.left;
          }
        }
      }
      return null;
    }
  }

  countNode(root) {
    if (root == null) {
      return 0;
    } else {
      return 1 + this.countNode(root.left) + this.countNode(root.right);
    }
  }

  countChildNode(node) {
    return this.countNode(node) - 1;
  }

  countHeight(root) {
    if (root == null) {
      return -1;
    }
    return (
      1 + Math.max(this.countHeight(root.left), this.countHeight(root.right))
    );
  }

  isNodeBalanced(node) {
    let result = Math.abs(
      this.countHeight(node.left) - this.countHeight(node.right)
    );
    return result < 2;
  }

  isTreeBalanced(node) {
    if (node == null) {
      this.balance++;
    } else if (this.isNodeBalanced(node) == false) {
      this.balance -= 9999;
    } else {
      this.isTreeBalanced(node.left);
      this.isTreeBalanced(node.right);
    }

    if (this.balance < 1) {
      return false;
    } else {
      return true;
    }
  }

  /*findUnbalanced(node) {
    //this.balance = 1;
    if (node == null) {
      node.unb = 0;
    } else {
      if (this.isNodeBalanced(node) == false) {
        this.found = 1;
        Node.Uinfo = 1;
      } else {
        this.findUnbalanced(node.left);
        this.findUnbalanced(node.right);
      }
    }
    if (this.found == 1) {
      return this.searchUinfo(node, 1);
    } else {
      return null;
    }
  }*/

  findUnbalanced(node) {
    if (node == null) {
      return;
    } else {
      if (this.isNodeBalanced(node) == false) {
        print("Unbalanced at node: " + node.info);
        this.Uinfo = node.info;
      }
      this.findUnbalanced(node.left);
      this.findUnbalanced(node.right);
    }
  }

  searchRightMost(node) {
    node = node.left;
    while (node.right != null) {
      node = node.right;
    }
    node.green = true;
    return node;
  }

  delete(node, info) {
    let Tnode = this.search(node, info);
    let Pnode = this.searchParent(node, info);
    if (Tnode.countChildNode == 0) {
      if (Tnode.info < Pnode.info) {
        print("lesser");
        Pnode.left = null;
      } else {
        print("more");
        Pnode.right = null;
      }
    }
    return node;
  }

  resetUinfo() {
    this.Uinfo = -1;
  }

  resetBalance() {
    this.balance = 1;
  }
}
