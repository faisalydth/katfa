import json
import random

with open("data/init.json") as infile:
    init_data = json.load(infile)
    random.shuffle(init_data)

final_data = []
for i in range(len(init_data)):
    final_data.append(init_data[i].upper())

with open("data/final.js", "w") as outfile:
    json.dump(final_data, outfile)
