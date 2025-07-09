const score = sessionStorage.getItem("score");

var startButton = document.getElementById("startButton");
var scoreLabel = document.getElementById("scoreLabel");

scoreLabel.innerHTML = 'Your score is ' + score + '!';

startButton.addEventListener('click', () => {
    window.location.href = '../pages/quiz.html';
});