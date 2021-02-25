var pag = 1;

const cargarListado = () => {
  fetch("https://rickandmortyapi.com/api/character?page=" + pag)
    .then((response) => response.json())
    .then((data) => fillData(data));
};

const fillData = (data) => {
  var html = "";
  data.results.forEach((elem) => {
    html += "<div class = 'character'>";
    html += "<div id = 'profilepic'>";
    html += "<img src='" + elem.image + "'alt='profile img'/>";
    html += "</div>";
    html += "<div class = 'description'>";
    html += "<div id = 'name'>" + elem.name + "</div>";
    html += "<div id = 'status'>";
    if (elem.status === "Alive") var status = "status_alive";
    if (elem.status === "Dead") var status = "status_dead";
    if (elem.status === "unknown") var status = "status_unknown";
    html +=
      "<div class =" +
      status +
      "></div>" +
      elem.status +
      " - " +
      elem.species +
      "</div>";
    html += "<div id='origin'> Origin: <br>";
    html += "<i>" + elem.origin.name + "</i></div>";
    html += "<div id='lastloc'> Last known location: <br>";
    html += "<i>" + elem.location.name + "</i></div>";
    html += "</div></div>";
  });
  document.getElementById("listado").innerHTML = html;
};

function prevPage() {
  pag = pag - 1;
  if (pag <= 1) {
    pag = 1;
    document.getElementById("prevnum").style.visibility = "hidden";
  }
  if (pag < 34) document.getElementById("nextnum").style.visibility = "visible";
  cargarListado(pag);
}

function nextPage() {
  pag = pag + 1;
  if (pag >= 34) {
    pag = 34;
    document.getElementById("nextnum").style.visibility = "hidden";
  }
  if (pag > 1) document.getElementById("prevnum").style.visibility = "visible";
  cargarListado(pag);
}
