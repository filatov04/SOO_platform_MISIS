import json

def parse():
    ar = {}
    a = input().split()
    while a:
        ar[int(a[0])] = [int(i) for i in a[1:]]
        a = input().split()
         
    return json.dumps(ar)

print(parse())