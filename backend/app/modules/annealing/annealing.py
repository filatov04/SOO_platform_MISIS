
from typing import Dict, List, Optional, Any
from datetime import datetime
import calendar
import random
import secrets
import random
from collections import defaultdict
from math import exp, ceil
import json

class Annealing:
    def __init__(self, data: Dict[int, List[int]]): # data format dict: {user_id: [days, when people dont work]}
        self.data = data
        self.month_days = calendar.monthrange(datetime.now().year, datetime.now().month)[1]
        self.work_days = ceil(self.month_days * 2 / len(data.keys()))
         
    def gen(self):
        ar = [[0] * self.month_days for i in range(2)]
        duty_users = dict()
        users = list(self.data.keys())
        for i in range(4):
            random.shuffle(users)
        n = len(users)
        it = 0
        cnt = 0
        while cnt < self.month_days:
            if it >= n:
                it = 0
            if (cnt + 1) not in self.data[users[it]]:
                ar[0][cnt] = users[it]
                cnt += 1
            it += 1
        cnt = 0
        while cnt < self.month_days:
            if it >= n:
                it = 0
            ar[1][cnt] = users[it]
            cnt += 1
            it += 1
        return ar
    
    
    def cnt(self, ar):
        cnt = 0
        for i in range(self.month_days):
            if (i + 1) in self.data[ar[1][i]]:
                cnt += 1
            if ar[0][i] == ar[1][i]:
                cnt += 1
        return cnt

    def format(self, ar):
        duty = {}
        for i in range(2):
            for j in range(self.month_days):
                if ar[i][j] not in duty:
                    duty[ar[i][j]] = []
                duty[ar[i][j]].append(j + 1)
        
        return duty
    
    def main(self):
        t = 1.0
        for IT1 in range(10):
            ar = self.gen()
            for IT2 in range(10**7 // 10 // self.month_days):
                t *= 0.99
                cnt = self.cnt(ar)
                if cnt == 0:
                    return self.format(ar)
                x, y = secrets.randbelow(self.month_days), secrets.randbelow(self.month_days)
                while x == y:
                    y = secrets.randbelow(self.month_days)
                ar[1][x], ar[1][y] = ar[1][y], ar[1][x]
                cnt2 = self.cnt(ar)
                if not (cnt2 < cnt or exp(((cnt2 - cnt) / t) % 700) < 2147483647):
                    ar[1][x], ar[1][y] = ar[1][y], ar[1][x]
        return {}
