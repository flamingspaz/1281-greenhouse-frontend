import serial
import web
import json

urls = (
  '/api/getdata.json', 'getData',
  '/api/openWindow', 'openWindow',
  '/api/closeWindow', 'closeWindow',
  '/api/setOverride', 'setOverride',
  '/api/rmOverride', 'rmOverride'
)
serial = serial.Serial("/dev/ttyUSB0", 9600, timeout=3)
serial.close()
class getData:
    def GET(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(serializeFromSerial())
class openWindow:
    def GET(self):
        serial.open()
        serial.write("a")
        serial.close()
        return
class closeWindow:
    def GET(self):
        serial.open()
        serial.write("b")
        serial.close()
        return
class setOverride:
    def GET(self):
        serial.open()
        serial.write("c")
        serial.close()
        return
class rmOverride:
    def GET(self):
        serial.open()
        serial.write("d")
        serial.close()
        return

def serializeFromSerial():
 serial.open()
 data = serial.readline()
 serial.close()
 print(data)
#data = '{"temp":26,"humidity":30,"windowState":"open"}' # load in some dummy data for now
 j = json.loads(data)
 return j

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
