
from typing import Dict, List, Optional, Any
from datetime import datetime
import calendar
import random
import secrets
import random
from collections import defaultdict

class Annealing:
    def __init__(self, data: Dict[int, List[int]], work_days: int = 4): # data format dict: {user_id: [days, when people dont work]}
        self.data = data
        self.month_days = 30 # calendar.monthrange(datetime.now().year, datetime.now().month)[1]
        self.work_days = work_days
         
    def gen(self):
        ar = [[0] * self.month_days for i in range(self.work_days)]
        users = list(self.data.keys())
        count_workdays_dict = defaultdict(int)
        fl = 1
        for _ in range(20):
            if not fl:
                break
            random.shuffle(users)
            it = -1
            cnt = 0
            operations = 0
            fl = 0
            while cnt < self.month_days:
                if operations > 1000:
                    fl = 1
                    break
                it += 1
                it %= len(users)
                
                if (cnt + 1) in self.data[users[it]] or count_workdays_dict[users[it]] > self.work_days:
                    operations += 1
                    continue
                
                ar[0][cnt] = users[it]
                count_workdays_dict[users[it]] += 1
                cnt += 1      
        
        if fl:
            print('fail')
            return
        print(ar)
        
    # def get_data(self):
    #     self.shu
        

data = {
    1: [3, 2],
    2: [1, 3],
    3: [1, 5],
    4: [1, 2],
    5: [1, 9],
    6: [1, 10],
    7: [1, 19],
    8: [1, 21],
    9: [1, 1],
    10: [1, 7] 
}

an = Annealing(data, work_days=2).gen()