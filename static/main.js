var sensorData
function reqListener() {
  sensorData = JSON.parse(this.responseText);
  var windowStr;
  var humidStr;


  if (sensorData.windowState === 1) {
    windowStr = "open";
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Temperature threshold triggered");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Temperature threshold triggered");
        }
      });
    }
  }

  else {
    windowStr = "closed";
  }

  if (sensorData.humidState === 1) {
    humidStr = "off";
  }
  else {
    humidStr = "on";
  }

  // Add the loaded values into the document
  document.getElementById('temp').innerHTML = sensorData.temp;
  document.getElementById('humid').innerHTML = sensorData.humidity;
  document.getElementById('humidifier').innerHTML = humidStr;
  document.getElementById('windowState').innerHTML = windowStr;
  document.getElementById('initialloader').style.display = "none";
  document.getElementById('maindiv').style.display = "block";
  if (sensorData.overrideState === 1) {
    document.getElementById('override').style.display = "block"; // If the controller is already overridden show the box
  }
  document.getElementById('overridebox').disabled = false; // else don't
}

document.addEventListener('DOMContentLoaded', function() {
  // After the initial load grab the data from serial
    doXHR();
  setInterval(function() {
    // and keep doing it every 7 seconds
      doXHR();
  }, 7000);

}, false);

function openWindow() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener2);
  xhr.open("GET", "/api/openWindow");
  xhr.send();
}

function closeWindow() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener2);
  xhr.open("GET", "/api/closeWindow");
  xhr.send();
}

function reqListener2() {
  if (sensorData.windowState === 1) {
      document.getElementById("windowState").innerHTML = "open";
  }
  else {
    document.getElementById("windowState").innerHTML = "closed";
  }
  // After requesting a open/closeWindow, change the DOM
}

function doXHR() {
  document.getElementById('overridebox').disabled = true;
  document.getElementById('override').style.display = "none";
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);
  xhr.open("GET", "/api/getdata.json");
  xhr.send();
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
    document.body.querySelectorAll("#containerdiv p")[0].innerHTML = "Error: " + xhr.statusText;
    document.getElementById('overridebox').disabled = false;
  };
}

function toggleOverride() {
  var xhr = new XMLHttpRequest();
  if (document.getElementById('overridebox').checked) {
    xhr.addEventListener("load", reqListener3);
    xhr.open("GET", "/api/setOverride");
    xhr.send();
    document.getElementById('override').style.display = "inline";
  }
  else {
    xhr.addEventListener("load", reqListener3);
    xhr.open("GET", "/api/rmOverride");
    xhr.send();
    document.getElementById('override').style.display = "none";
  }
}


function reqListener3() {
  //document.getElementById("windowState").innerHTML = "open";
}
