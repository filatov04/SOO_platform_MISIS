
from typing import Dict, List, Optional, Any
from datetime import datetime
import calendar
import random
import secrets
import random
from collections import defaultdict
from math import exp

class Annealing:
    def __init__(self, data: Dict[int, List[int]], work_days: int = 4): # data format dict: {user_id: [days, when people dont work]}
        self.data = data
        self.month_days = 30 # calendar.monthrange(datetime.now().year, datetime.now().month)[1]
        self.work_days = work_days
         
    def gen(self):
        ar = [[0] * self.month_days for i in range(2)]
        users = list(self.data.keys())
        for i in range(4):
            random.shuffle(users)
        
        n = len(users)
        
        it = 0
        while it < self.month_days:
            ar[0][it] = users[it % n]
            it += 1
        
        cnt = 0
        while cnt < self.month_days:
            it += 1
            if (cnt + 1) in self.data[users[it % n]]:
                continue
            
            ar[1][cnt] = users[it % n]
            cnt += 1

            
        return ar
    
    def cnt(self, ar):
        cnt = 0
        for i in range(self.month_days):
            if (i + 1) in self.data[ar[0][i]]:
                cnt += 1
                
            if ar[0][i] == ar[1][i]:
                cnt += 1
                
        return cnt

    def main(self):
        t = 1.0
        for IT1 in range(10):
            ar = self.gen()
            for IT2 in range(10**7 // 10 // self.month_days):
                t *= 0.99
                cnt = self.cnt(ar)
                if cnt == 0:
                    return ar
                
                x, y = secrets.randbelow(self.month_days), secrets.randbelow(self.month_days)
                while x == y:
                    y = secrets.randbelow(self.month_days)
                    
                ar[0][x], ar[0][y] = ar[0][y], ar[0][x]
                
                cnt2 = self.cnt(ar)
                
                try:
                    if not (cnt2 < cnt or exp((cnt2 - cnt) / t) < 2147483647):
                        ar[0][x], ar[0][y] = ar[0][y], ar[0][x]
                except:
                    print(cn2, cnt, t)
                    
        return []
            
data = {
    1: [2, 2],
    2: [3, 3],
    3: [4, 4],
    4: [5, 5],
    5: [6, 6],
    6: [7, 7],
    7: [8, 8],
    8: [9, 9],
    9: [10, 10],
    10: [11, 11],
    11: [12, 12],
    12: [13, 13],
    13: [14, 14],
    14: [15, 15],
    15: [16, 16] 
}

an = Annealing(data, work_days=4).main()
print(an[0])
print(an[1])
d = {}
for i in range(2):
    for j in range(30):
        d[an[i][j]] = d.get(an[i][j], 0) + 1

for el in d.items():
    print(el)