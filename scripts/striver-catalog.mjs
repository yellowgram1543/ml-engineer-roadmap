// Canonical Striver 180 keywords / phrases / IDs for robust matching against practice ladder titles
export const STRIVER_180_PATTERNS = [
  // Day 1: Arrays
  'set matrix zeroes', 'pascal', 'next permutation', 'maximum subarray', 'sort colors', 'stock buy and sell', 'best time to buy and sell stock',
  
  // Day 2: Arrays Part-II
  'rotate image', 'rotate array', 'merge intervals', 'merge sorted array', 'duplicate number', 'find the duplicate number', 'repeat and missing', 'count inversions', 'inversion',
  
  // Day 3: Arrays Part-III
  'search in a 2d matrix', 'pow(x, n)', 'pow(x,n)', 'majority element', 'unique paths', 'reverse pairs',
  
  // Day 4: Arrays Part-IV
  'two sum', '4sum', 'longest consecutive sequence', 'largest subarray with 0 sum', 'subarray with given xor', 'count subarrays with given xor', 'longest substring without repeating',
  
  // Day 5: Linked List
  'reverse linked list', 'middle of the linked list', 'merge two sorted lists', 'remove nth node from end', 'add two numbers', 'delete node in a linked list',
  
  // Day 6: Linked List Part-II
  'intersection of two linked lists', 'linked list cycle', 'reverse nodes in k-group', 'palindrome linked list', 'flattening a linked list',
  
  // Day 7: Linked List and Arrays
  'rotate list', 'copy list with random pointer', '3sum', 'trapping rain water', 'remove duplicates from sorted array', 'max consecutive ones',
  
  // Day 8: Greedy Algorithm
  'n meetings in one room', 'minimum platforms', 'job sequencing', 'fractional knapsack', 'minimum number of coins', 'greedy minimum coins', 'assign cookies',
  
  // Day 9: Recursion
  'subset sums', 'subsets', 'combination sum', 'palindrome partitioning', 'k-th permutation', 'permutation sequence',
  
  // Day 10: Recursion and Backtracking
  'permutations', 'n-queens', 'sudoku solver', 'm-coloring', 'rat in a maze', 'word break ii',
  
  // Day 11: Binary Search
  'nth root of an integer', 'matrix median', 'single element in a sorted array', 'search in rotated sorted array', 'median of two sorted arrays', 'k-th element of two sorted arrays', 'allocate minimum number of pages', 'aggressive cows',
  
  // Day 12: Heaps
  'kth largest element in an array', 'kth smallest element', 'maximum sum combination', 'find median from data stream', 'merge k sorted lists', 'top k frequent', 'k most frequent',
  
  // Day 13: Stack and Queue
  'implement stack using queues', 'implement queue using stacks', 'valid parentheses', 'next greater element', 'sort a stack', 'next smaller element',
  
  // Day 14: Stack and Queue Part-II
  'lru cache', 'lfu cache', 'largest rectangle in histogram', 'sliding window maximum', 'min stack', 'implement min stack', 'rotting oranges', 'online stock span', 'celebrity problem', 'the celebrity problem',
  
  // Day 15: String
  'reverse words in a string', 'longest palindromic substring', 'roman to integer', 'integer to roman', 'string to integer (atoi)', 'implement strstr', 'longest common prefix', 'rabin karp',
  
  // Day 16: String Part-II
  'z-function', 'minimum characters to make palindromic', 'minimum characters needed', 'valid anagram', 'count and say', 'compare version numbers',
  
  // Day 17: Binary Tree
  'binary tree inorder traversal', 'binary tree preorder traversal', 'binary tree postorder traversal', 'morris traversal', 'left view', 'right side view', 'bottom view', 'top view', 'vertical order traversal', 'root to node path', 'maximum width of binary tree',
  
  // Day 18: Binary Tree Part-II
  'binary tree level order traversal', 'maximum depth of binary tree', 'diameter of binary tree', 'balanced binary tree', 'lowest common ancestor of a binary tree', 'same tree', 'zigzag level order', 'boundary traversal of binary tree',
  
  // Day 19: Binary Tree Part-III
  'binary tree maximum path sum', 'construct tree from preorder and inorder', 'construct tree from inorder and postorder', 'construct binary tree', 'symmetric tree', 'flatten binary tree', 'children sum property',
  
  // Day 20: Binary Search Tree
  'populating next right pointers', 'search in a binary search tree', 'convert sorted array to bst', 'convert sorted array to binary search tree', 'construct binary search tree', 'validate binary search tree', 'lowest common ancestor of a bst', 'inorder predecessor and successor',
  
  // Day 21: Binary Search Tree Part-II
  'floor and ceil in a bst', 'ceil and floor in a bst', 'kth smallest element in a bst', 'kth largest element in a bst', 'two sum iv', 'binary search tree iterator', 'size of the largest bst in binary tree', 'serialize and deserialize binary tree',
  
  // Day 22: Binary Trees [Miscellaneous]
  'binary tree to double linked list', 'kth largest element in a stream', 'distinct numbers in window', 'flood fill',
  
  // Day 23: Graph
  'clone graph', 'detect cycle in undirected graph', 'detect cycle in directed graph', 'course schedule', 'topological sort', 'number of islands', 'is graph bipartite',
  
  // Day 24: Graph Part-II
  'strongly connected components', 'kosaraju', 'dijkstra', 'network delay time', 'bellman-ford', 'cheapest flights within k stops', 'floyd-warshall', 'find the city', 'prim', 'mst using prim', 'kruskal', 'min cost to connect all points',
  
  // Day 25: Dynamic Programming
  'maximum product subarray', 'longest increasing subsequence', 'longest common subsequence', '0/1 knapsack', '0-1 knapsack', 'edit distance', 'maximum sum increasing subsequence', 'matrix chain multiplication',
  
  // Day 26: Dynamic Programming Part-II
  'maximum profit in job scheduling', 'job scheduling with maximum profit', 'palindrome partitioning ii', 'minimum cost to cut a stick', 'minimum path sum', 'coin change', 'partition equal subset sum', 'rod cutting', 'egg dropping', 'word break'
];

export function isStriver180(problemTitle) {
  if (!problemTitle) return false;
  const norm = problemTitle.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  return STRIVER_180_PATTERNS.some((pat) => {
    const pNorm = pat.toLowerCase().replace(/[^a-z0-9]/g, ' ');
    return norm.includes(pNorm);
  });
}
