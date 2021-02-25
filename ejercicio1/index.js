displayLength = 0;
function addValue(a) {
  if (displayLength < 12) {
    document.getElementById("pantalla").innerHTML += a;
    displayLength++;
  }
}

function solve() {
  document.getElementById("pantalla").innerHTML = eval(
    document.getElementById("pantalla").innerHTML
  );
}

function clearDisplay() {
  document.getElementById("pantalla").innerHTML = "";
  displayLength = 0;
}

function plusmin() {
  var a = document.getElementById("pantalla").innerHTML;
  a = a * -1;
  document.getElementById("pantalla").innerHTML = a;
}
