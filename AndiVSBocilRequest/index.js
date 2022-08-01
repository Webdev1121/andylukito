window.onload = function () {
  const restartButton = document.getElementById("restartButton");
  Game.init();
};

restartButton.addEventListener("click", function () {
  location.reload();
});
