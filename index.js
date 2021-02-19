// METEORITES MOVEMENT
function moveMet(id) {
  var time = Math.random() * (25 - 200) + 200;
  var meteoritesInterval = setInterval(() => {
    var intFrameWidth = window.innerWidth * 0.8;
    document.getElementById(id).style.position = "relative";
    if (
      document.getElementById(id).style.top === "" &&
      document.getElementById(id).style.left === ""
    ) {
      document.getElementById(id).style.top = "0px";
      document.getElementById(id).style.left = Math.random() * intFrameWidth;
      +"px";
    }
    var position = document.getElementById(id).style.top;
    var pos = parseInt(position.replace("px", ""));
    var intFrameHeight = self.innerHeight * 0.53;
    if (pos < intFrameHeight) {
      document.getElementById(id).style.top = pos + 10 + "px";
      pos = pos + 10;
    } else {
      document.getElementById(id).style.top = 0;
      document.getElementById(id).style.left = Math.random() * intFrameWidth;
      +"px";
    }

    if (document.getElementById("ship").style.top === "")
      document.getElementById("ship").style.top = "0";
    if (document.getElementById("ship").style.left === "")
      document.getElementById("ship").style.left = "0";
    var shipTop =
      parseInt(document.getElementById("ship").style.top) + intFrameHeight - 30;
    var shipLeft = parseInt(document.getElementById("ship").style.left);

    shipLeft1 = shipLeft - 25;
    shipLeft2 = shipLeft + 25;

    metTop = parseInt(document.getElementById(id).style.top);
    metLeft = parseInt(document.getElementById(id).style.left);
    debugger;
    if (metTop >= shipTop && metLeft > shipLeft1 && metLeft < shipLeft2) {
      window.alert("GAME OVER!");
    }
  }, time);
}

// PLAYER MOVEMENTS
document.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    if (document.getElementById("ship").style.left === "")
      document.getElementById("ship").style.left = "0px";

    switch (event.key) {
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        document.getElementById("ship").style.position = "relative";
        var position = document.getElementById("ship").style.left;
        var pos = parseInt(position.replace("px", ""));
        var intFrameWidth = window.innerWidth * 0.95;
        if (pos * -1 < 0) {
          document.getElementById("ship").style.left = pos - 7 + "px";
        }
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        document.getElementById("ship").style.position = "relative";
        var position = document.getElementById("ship").style.left;
        var pos = parseInt(position.replace("px", ""));
        var intFrameWidth = window.innerWidth * 0.9;
        if (pos < intFrameWidth) {
          document.getElementById("ship").style.left = pos + 7 + "px";
        }
        break;
      case " ":
        var laser = fireLaser();
        document.getElementById("laser").appendChild(laser);
        moveLaser(laser);
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);

// CREATE LASER
function fireLaser() {
  var newLaser = document.createElement("img");
  newLaser.src = "img/laser.png";
  newLaser.classList.add("laser");
  return newLaser;
}

function moveLaser(laser) {
  laser.style.top = "0px";

  laser.style.left = parseInt(
    window
      .getComputedStyle(document.getElementById("ship"))
      .getPropertyValue("left")
  );
  var laserInterval = setInterval(() => {
    var intFrameWidth = window.innerWidth * 0.9;
    laser.style.position = "relative";
    var position = laser.style.top;
    var pos = parseInt(position.replace("px", ""));
    var intFrameHeight = self.innerHeight * 0.47;
    if (pos * -1 < intFrameHeight) {
      laser.style.top = pos - 10 + "px";
      pos = pos - 10;
    } else {
      laser.remove();
    }

    // ALIEN COLLISION
    var alien = document.getElementsByClassName("enemigo");
    for (var i = 0; i < alien.length; i++) {
      var laserTop = parseInt(laser.style.top) * -1;
      /*
            var alien = document.getElementsByClassName("enemigo");
            for (var i = 0; i < alien.length; i++) {
              var alienBottom = alien.style.top - 30;
              */
      var alien0Bottom =
        parseInt(document.getElementById("en0").style.top) + 30;
      var alien1Bottom =
        parseInt(document.getElementById("en1").style.top) + 25;
      var alien2Bottom =
        parseInt(document.getElementById("en2").style.top) + 45;

      var alien0Left = parseInt(document.getElementById("en0").style.left);
      var alien1Left = parseInt(document.getElementById("en1").style.left);
      var alien2Left = parseInt(document.getElementById("en2").style.left);

      if (
        laserTop >= alien0Bottom ||
        laserTop >= alien1Bottom ||
        laserTop >= alien2Bottom
      ) {
        alien.src =
          "https://freepikpsd.com/wp-content/uploads/2019/10/explosion-pixel-png-Transparent-Images.png";
        //alien.classList.remove("enemigo");
      }
    }
  }, 10);
}

// ENEMIES MOVEMENTS
function moveEnemy(id) {
  var leftFrame = 0;
  var enemiesInterval = setInterval(() => {
    var intFrameWidth = window.innerWidth * 0.8;
    var intFrameHeight = (window.innerHeight * 0.9) / 2;
    document.getElementById(id).style.position = "relative";
    if (
      document.getElementById(id).style.top === "" &&
      document.getElementById(id).style.left === ""
    ) {
      document.getElementById(id).style.top = "0px";
      document.getElementById(id).style.left = "20px";
    }
    var positionLeft = document.getElementById(id).style.left;
    var posLeft = parseInt(positionLeft.replace("px", ""));
    var positionTop = document.getElementById(id).style.top;
    var posTop = parseInt(positionTop.replace("px", ""));

    if (posTop <= intFrameHeight) {
      // LEFT MOVE
      if (posLeft < intFrameWidth && leftFrame === 0) {
        document.getElementById(id).style.left = posLeft + 10 + "px";
        posLeft = posLeft + 10;
        if (posLeft >= intFrameWidth) {
          document.getElementById(id).style.top = posTop + 25 + "px";
          leftFrame = 1;
        }
      }
      // RIGTH MOVE
      if (leftFrame === 1) {
        document.getElementById(id).style.left = posLeft - 10 + "px";
        posLeft = posLeft - 10;
        if (posLeft <= window.innerWidth * 0.1) {
          document.getElementById(id).style.top = posTop + 25 + "px";
          leftFrame = 0;
        }
      }
    } else {
      window.alert("GAME OVER!");
    }
  }, 250);
}
