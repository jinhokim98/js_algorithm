import sys
from datetime import datetime

inputs = sys.stdin.read().splitlines()

n, l, f = inputs[0].split(' ')
fine = int(f)
day, time = l.split('/')
hour, minute = list(map(int, time.split(':')))

lentTime = int(day) * 24 * 60 + hour * 60 + minute

dict = {}
fineDict = {}

def getTime(date, time):
    return datetime.strptime(f'{date} {time}', "%Y-%m-%d %H:%M")

for i in range(int(n)):
    date, time, machine, lender = inputs[1 + i].split(' ')
    lendInfo = machine + lender
    
    if lendInfo not in dict:
        dict[lendInfo] = (getTime(date, time), lender)
    else:
        start = dict[lendInfo]
        del dict[lendInfo]
        minutes = int((getTime(date, time) - start[0]).total_seconds() / 60)

        if minutes > lentTime:
            if lender in fineDict:
                fineDict[lender] += (minutes - lentTime) * fine
            else:
                fineDict[lender] = (minutes - lentTime) * fine
        
if not fineDict:
    print(-1)
else:
    for lender in sorted(fineDict.keys()):
        print(f'{lender} {fineDict[lender]}')

    
