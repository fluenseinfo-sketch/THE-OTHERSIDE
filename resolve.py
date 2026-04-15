import urllib.request

url = "https://maps.app.goo.gl/doMZ4xmVn2fDxVvv8"
try:
    req = urllib.request.Request(url, method="HEAD")
    response = urllib.request.urlopen(req)
    print(response.geturl())
except Exception as e:
    print(e)
