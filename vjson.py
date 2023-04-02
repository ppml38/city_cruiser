# Program to correct to values in json, if theres any discrepancy
import json

filename = "./obj/city/city.json"
with open(filename) as f:
    js = json.loads(f.read());
    materials = js['geometries']
    for m in materials:
        data = m['data']
            
        if len(data['position']) != len(data['uv']):
            print("\n"+m['object'])
            print("%s - %s"%(len(data['position']), len(data['uv'])))
            
            n = len(data['position']) - len(data['uv'])
            for i in range(n):
                data['uv'].append(0)
            
            
with open("./obj/city/new.json","w") as f:
    f.write(json.dumps(js))