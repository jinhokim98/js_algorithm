import sys
from collections import Counter

trees = sys.stdin.read().splitlines()
counter = Counter(trees)

countedTrees = sorted(counter.items())

for tree, frequency in countedTrees:
    print(tree, f"{(frequency / len(trees) * 100):.4f}")