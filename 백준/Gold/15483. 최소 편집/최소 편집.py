word1 = input()
word2 = input()

d = [[0 for _ in range(len(word2) + 1)] for _ in range(len(word1) + 1)]

for i in range(1, len(word1) + 1):
    d[i][0] = i

for j in range(1, len(word2) + 1):
    d[0][j] = j
    
for i in range(1, len(word1) + 1):
    for j in range(1, len(word2) + 1):
        if word1[i - 1] == word2[j - 1]:
            d[i][j] = d[i - 1][j - 1]
        else:
            d[i][j] = min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1
        
print(d[len(word1)][len(word2)])