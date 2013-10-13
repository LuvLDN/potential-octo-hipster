import csv
import json 
import requests

ifile  = open('outlets.csv', "rb")
reader = csv.reader(ifile)

rownum = 0
for row in reader:

	item = {}
	item['name'] = row[7]
	item['type'] = row[8]
	item['description'] = row[9]
	item['postcode'] = row[11]
	item['image'] = row[10]
	item['location'] = { "lat" : row[12], "lon": row[13]}

	r =  requests.post("http://luvldn.com/~es/luvldn/outlet/", data = json.dumps(item))

	if r.status_code == 200:
		print "upload OK"
	else:
		print r.json
		break

