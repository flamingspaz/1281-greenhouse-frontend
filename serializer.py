import serial
import web
import json

# Define the URLs the Web server will respond to, and the classes that will run when that URL is accessed
urls = (
  '/api/getdata.json', 'getData',
  '/api/openWindow', 'openWindow',
  '/api/closeWindow', 'closeWindow',
  '/api/setOverride', 'setOverride',
  '/api/rmOverride', 'rmOverride'
)

# Set up our serial connection and close it due to weirdness with leaving it open.
# On Windows the device will be COM1, on Linux it is /dev/ttyUSB0
# Set our timeout to 3
serial = serial.Serial("/dev/ttyUSB0", 9600, timeout=3)
serial.close()


class getData:
    def GET(self):
        web.header('Content-Type', 'application/json') # Return the code as JSON so the browser can use it
        return json.dumps(serializeFromSerial()) # Parse the raw json
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
 data = serial.readline() # Read the next line from serial
 serial.close()
 print(data) # Print the data to terminal for debugging purposes
 j = json.loads(data) # Load the raw string as JSON
 return j # Return the JSON

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
