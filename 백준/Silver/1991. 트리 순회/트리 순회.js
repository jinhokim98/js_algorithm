const fs = require('fs');
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = +first;           // 필요 없지만 남겨 둠

const tree = {};
for (const line of rest) {
  const [node, left, right] = line.split(' ');
  tree[node] = [left, right];
}

let result = '';

const preorder = (node) => {
  if (node === '.') return;
  const [left, right] = tree[node];
  result += node;   
  preorder(left);   
  preorder(right); 
};

const inorder = (node) => {
  if (node === '.') return;
  const [left, right] = tree[node];
  inorder(left); 
  result += node;
  inorder(right); 
};

const postorder = (node) => {
  if (node === '.') return;
  const [left, right] = tree[node];
  postorder(left); 
  postorder(right); 
  result += node;
};

preorder('A');
console.log(result);

result = '';
inorder('A');
console.log(result);

result = '';
postorder('A');
console.log(result);
