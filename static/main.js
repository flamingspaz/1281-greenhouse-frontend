var sensorData
function reqListener() {
  sensorData = JSON.parse(this.responseText);
  var windowStr;
  var humidStr;
  console.log(sensorData.temp);
  if (sensorData.windowState === 1) {
    windowStr = "open";
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
  //document.body.innerHTML = "<div id=\"containerdiv\"><p>Temperature: " + sensorData.temp + "&deg;C</p><p>Humidity: " + sensorData.humidity + " RH</p><p>Humidifier is " + humidStr + "</p><p>Windows are <span id='windowState'>" + windowStr + "</span></p><input type='checkbox'>Manual override</input><button class='btn' onClick=\"openWindow()\">Open Window</button></div>";
  document.getElementById('temp').innerHTML = sensorData.temp;
  document.getElementById('humid').innerHTML = sensorData.humidity;
  document.getElementById('humidifier').innerHTML = humidStr;
  document.getElementById('windowState').innerHTML = windowStr;
  document.getElementById('initialloader').style.display = "none";
  document.getElementById('maindiv').style.display = "block";
  if (sensorData.overrideState === 1) {
    document.getElementById('override').style.display = "block";
  }
  document.getElementById('overridebox').disabled = false;
}

document.addEventListener('DOMContentLoaded', function() {
    doXHR();
  setInterval(function() {
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
