var d=document;
var submitButton = d.getElementById("submission");
var workers = d.getElementById("workers");
var results = d.getElementById("results");
var clicked = 0;


window.onload = generateInputElements();

function generateInputElements(){

 // List of Devs, default checked status, & strength
  var devs = [
    { name:"Elder", checked:"true", strong: true },
    { name:"Kyle", checked:"true", strong: false },
    { name:"Kevin", checked:"true", strong: false },
    { name:"Gruel", checked:"true", strong: true },
    { name:"Gopal", checked:"true", strong: false },
    { name:"John", checked:"true", strong: true },
    { name:"Karthig", checked:"true", strong: false },
    { name:"Pradeep", checked:"true", strong: true },
    { name:"Jeff", checked:"false", strong:t rue }
  ];

  devs = devs.sort(sortDevsByName);
  devs = devs.sort(sortDevsByStrength);

  for(var i = 0; i < devs.length; i++) {
    var apron = d.createElement('input');
    apron.setAttribute("type", "checkbox");
    if(devs[i].checked === "true"){
      apron.setAttribute("checked", "");
    }

    if(devs[i].strong === true){
      apron.setAttribute("class", "strong");
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
    var weakPairArray = inputsToWeakArray(workers.children);
    var strongPairArray = inputsToStrongArray(workers.children);
    var pairs = randomPairs(strongPairArray,weakPairArray);
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

function inputsToWeakArray (inputs) {
  var arr = [];
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked && !inputs[i].classList.contains('strong'))
      arr.push(inputs[i].value);
  }
  return arr;
}

function inputsToStrongArray (inputs) {
  var arr = [];
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked && inputs[i].classList.contains('strong'))
      arr.push(inputs[i].value);
  }
  return arr;
}

function randomPairs (strongPairs, weakPairs) {
  var listOfPairs = [],
      pair = [],
      randomNumber,
      worker

  // Pair out the strong folks first
  while (strongPairs.length > 0) {
    pair = []

    // Get a strong for this pair
    randomNumber = Math.floor((Math.random() * strongPairs.length));
    worker = strongPairs[randomNumber];
    pair.push(worker);
    strongPairs.splice(randomNumber, 1)

    // Find the partner, first pick a weak, and if none left, pick a strong
    if (weakPairs.length) {
      randomNumber = Math.floor((Math.random() * weakPairs.length));
      worker = weakPairs[randomNumber];
      pair.push(worker);
      weakPairs.splice(randomNumber, 1)
    } else if(strongPairs.length) {
      randomNumber = Math.floor((Math.random() * strongPairs.length));
      worker = strongPairs[randomNumber];
      pair.push(worker);
      strongPairs.splice(randomNumber, 1)
    }
    listOfPairs.push(pair);
  }

  // If all the strongs have been handled, pair up remaining weaks
  while (weakPairs.length > 0) {
    pair = []
    for (var i=0; i<2; i++) {
      randomNumber = Math.floor((Math.random() * weakPairs.length));
      worker = weakPairs[randomNumber];
      pair.push(worker);
      weakPairs.splice(randomNumber, 1)
    }
    listOfPairs.push(pair);
  }
  return listOfPairs;
}

function sortDevsByStrength(a,b) {
  if (a.strong < b.strong) { return 1; }
  if (a.strong > b.strong) { return -1; }
  return 0;
}

function sortDevsByName(a,b) {
  if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
  if (a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
  return 0;
}

function displayResults(pairsArray) {
  for (var i = 0; i < pairsArray.length; i++) {
    var pair = pairsArray[i];
    if (pair[1] !== undefined){
      var pairHtml = '<p>' + pair[0] + '<br>' + pair[1] + '</p>';
      results.innerHTML += '<div class="pair"> <p>Pair:</p>' + pairHtml + '</div>';
    } else {
      var pairHtml = '<p>' + pair[0] + '</p>';
      results.innerHTML += '<div class="pair"> <p>Lone wolf<br />or Trip up:</p>' + pairHtml + '</div>';
      };
  }
}
