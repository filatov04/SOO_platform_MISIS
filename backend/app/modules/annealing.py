
from typing import Dict, List, Optional, Any
from datetime import datetime
import calendar
import random
import secrets
import random
from collections import defaultdict
from math import exp, ceil

class Annealing:
    def __init__(self, data: Dict[int, List[int]]): # data format dict: {user_id: [days, when people dont work]}
        self.data = data
        self.month_days = 11 # calendar.monthrange(datetime.now().year, datetime.now().month)[1]
        self.work_days = ceil(self.month_days * 2 / len(data.keys()))
         
    def gen(self):
        duty_users = {}
        n = len(self.data.keys())
        users = []
        ar = [[0] * self.month_days for i in range(2)]
        while len(users) < self.month_days * 2:
            users.extend(self.data.keys())
            
        used = [0] * len(users)
        it = -1
        cnt = 0
        while cnt < self.month_days:
            it += 1
            it %= len(users)
            if (cnt + 1) in self.data[users[it]] or used[it]:
                continue
            
            ar[0][cnt] = users[it]
            used[it] = 1
            cnt += 1

        cnt = 0
        while cnt < self.month_days:
            it += 1
            it %= len(users)
            if used[it]:
                continue
            
            ar[1][cnt] = users[it]
            used[it] = 1
            cnt += 1

        print(ar)
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
                    
                ar[1][x], ar[1][y] = ar[1][y], ar[1][x]
                
                cnt2 = self.cnt(ar)
                
                try:
                    if not (cnt2 < cnt or exp((cnt2 - cnt) / t) < 2147483647):
                        ar[1][x], ar[1][y] = ar[1][y], ar[1][x]
                except:
                    print(cnt2, cnt, t)
                    return
                    
        return []
            
data = {
    1: [4, 5, 6, 7, 8, 9, 10],
    2: [4, 5, 6, 7, 8, 9, 10],
    3: [1, 3, 4],
    4: [4, 5, 6, 7, 8, 9, 10],
    5: [5, 6],
    6: [4, 5, 6, 7, 8, 9, 10],
    7: [4, 5, 6, 7, 8, 9, 10],
    8: [4, 5, 6, 7, 8, 9, 10],
    9: [9, 10],
    10: [10, 11]
}

an = Annealing(data).main()
print(an[0])
print(an[1])
d = {}
for i in range(2):
    for j in range(11):
        d[an[i][j]] = d.get(an[i][j], 0) + 1

for el in d.items():
    print(el)