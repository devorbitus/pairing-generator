var d=document;
var submitButton = d.getElementById("submission");
var workers = d.getElementById("workers");
var results = d.getElementById("results");
var clicked = 0;


window.onload = generateInputElements();

function generateInputElements(){
  
//edit your available developers here so you don't have to change 4 html attributes every time

  var devs = [
    { name:"Elder", checked:"true"},
    { name:"Kyle", checked:"true"},
    { name:"Kevin", checked:"true"},
    { name:"Gruel", checked:"true"},
    { name:"Gopal", checked:"true"},
    { name:"John", checked:"true"},
    { name:"Karthig", checked:"true"},
    { name:"Pradeep", checked:"true"},
    { name:"Jeff", checked:"false"}
  ];
  for(var i = 0; i < devs.length; i++) {
    var apron = d.createElement('input');
    apron.setAttribute("type", "checkbox");
    if(devs[i].checked === "true"){
      apron.setAttribute("checked", "");
    }
    apron.setAttribute("value", devs[i].name);
    apron.id = devs[i].name;
    var label = d.createElement("label");
    label.setAttribute("for", devs[i].name);
    label.innerHTML = devs[i].name;
    workers.appendChild(apron);
    apron.insertAdjacentHTML('afterend', "\n");
    apron.insertAdjacentHTML('afterend',label.outerHTML);
  }
  console.log("Thank you Zero");
}


//submit event registration
submitButton.onclick = function () {
  if (clicked == 0) {
    results.className = "hidden";
    results.innerHTML = "";
    var workerArray = inputsToArray(workers.children);
    var pairs = randomPairs(workerArray);
    displayResults(pairs);
    results.className = "visible";
  }
  clicked += 1;
  if (clicked == 6) {
    var nope = document.createElement('p')
    nope.innerHTML = "What? You don't like your partner?";
    results.insertBefore(nope, results.firstChild);
  }
}

function inputsToArray (inputs) {
  var arr = [];
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked)
      arr.push(inputs[i].value);
  }
  return arr;
}

function randomPairs (workersToBePaired) {
  var listOfPairs = [];
  var listOfWorkers = workersToBePaired;
  while (listOfWorkers.length > 0) {
    var pair = []
    for (var i = 0; i < 2; i++) {
      var randomNumber = Math.floor((Math.random() * listOfWorkers.length));
      var worker = listOfWorkers[randomNumber];
      pair.push(worker);
      listOfWorkers.splice(randomNumber, 1)
    }
    listOfPairs.push(pair);
  }
  return listOfPairs;
}

function displayResults(pairsArray) {
  for (var i = 0; i < pairsArray.length; i++) {
    var pair = pairsArray[i];
    if (pair[1] !== undefined){
      var pairHtml = '<p>' + pair[0] + '<br>' + pair[1] + '</p>';
      results.innerHTML += '<div class="pair"> <p>Pair:</p>' + pairHtml + '</div>'; 
    } else {
      var pairHtml = '<p>' + pair[0] + '</p>';
      results.innerHTML += '<div class="pair"> <p>No pairing for you:</p>' + pairHtml + '</div>'; 
      };  
  }
}
