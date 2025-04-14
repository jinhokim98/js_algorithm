word = input()

answer = []

for i in range(len(word)):
    if word[i].isupper():
        answer.append(word[i].lower())
    else:
        answer.append(word[i].upper())
        
print(''.join(answer))