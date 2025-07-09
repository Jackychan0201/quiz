var score = 0;
optionButtons = document.getElementsByClassName('option-button-default');
submitButton = document.getElementById("submitButton");
let chosenOptionsCount = 0;
let isActive = false;
let currentQuestionIndex = 1;

let questionsAndOptions = [
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Figma", "Nigma", "Bigma", "Digma"],
    correct: 0},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Bigma", "Nigma", "Figma", "Digma"],
    correct: 2},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Nigma", "Figma", "Bigma", "Digma"],
    correct: 1},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Digma", "Nigma", "Bigma", "Figma"],
    correct: 3},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Digma", "Nigma", "Bigma", "Figma"],
    correct: 3},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Nigma", "Figma", "Bigma", "Digma"],
    correct: 1},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Bigma", "Nigma", "Figma", "Digma"],
    correct: 2},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Bigma", "Nigma", "Digma", "Figma"],
    correct: 3},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Bigma", "Figma", "Nigma", "Digma"],
    correct: 1},
    {question: "An interface design application that runs in the browser with team-based collaborative design projects", 
    options: ["Figma", "Nigma", "Bigma", "Digma"],
    correct: 0}
];

for (let i=0; i<optionButtons.length; i++){
    optionButtons[i].addEventListener('click', () => {
        optionButtons[i].classList.toggle('option-button-clicked');
        optionButtons[i].classList.toggle('no-hover');

        if (optionButtons[i].classList[optionButtons[i].classList.length-1] === 'no-hover'){
            chosenOptionsCount++;
        }
        else{
            chosenOptionsCount--;
        }

        if ((chosenOptionsCount > 0 && !isActive) || (chosenOptionsCount === 0 && isActive)){
            isActive = !isActive;
            submitButton.classList.toggle('submit-button-disabled');
            submitButton.classList.toggle('submit-button-enabled');
            submitButton.disabled = !submitButton.disabled;
        }
    });
}

submitButton.addEventListener('click', validateAnswer);

function validateAnswer(){
    submitButton.innerHTML = 'Next';
    for (let i=0; i<optionButtons.length; i++){
        optionButtons[i].disabled = true;
        if (optionButtons[i].classList[optionButtons[i].classList.length-1] === 'no-hover'){
            optionButtons[i].classList.toggle('option-button-clicked');
            if (i !== questionsAndOptions[currentQuestionIndex-1].correct) {
                optionButtons[i].classList.toggle('option-button-incorrect');
                score--;
            }
            else{
                score++;
            }
        }
        if (optionButtons[i].classList[optionButtons[i].classList.length-1] != 'no-hover' && 
            optionButtons[i].classList[optionButtons[i].classList.length-1] != 'option-button-incorrect'){
            optionButtons[i].classList.toggle('no-hover');
        }
    }
    optionButtons[questionsAndOptions[currentQuestionIndex-1].correct].classList.toggle('option-button-correct');


    submitButton.removeEventListener('click', validateAnswer);
    currentQuestionIndex++;
    chosenOptionsCount = 0;
    if (currentQuestionIndex === 11){
        submitButton.addEventListener('click', () =>
        window.location.href = '../pages/finish.html');
        sessionStorage.setItem("score", score);
    }
    else{
        submitButton.addEventListener('click', nextQuestion);
    }
}

function nextQuestion(){ 
    submitButton.innerHTML = 'Submit';
    submitButton.disabled = true;
    questionText = document.getElementById("questionText");
    questionText.innerHTML = questionsAndOptions[currentQuestionIndex-1].question;

    if ((chosenOptionsCount > 0 && !isActive) || (chosenOptionsCount === 0 && isActive)){
            isActive = !isActive;
            submitButton.classList.toggle('submit-button-disabled');
            submitButton.classList.toggle('submit-button-enabled');
    }

    for (let i=0; i<optionButtons.length; i++){
        optionButtons[i].disabled = false;
        if (currentQuestionIndex !== 1) {
            optionButtons[i].classList.toggle('no-hover');
        }
        if (optionButtons[i].classList[optionButtons[i].classList.length-1] === 'option-button-correct'){
            optionButtons[i].classList.toggle('option-button-correct');
        }
        if (optionButtons[i].classList[optionButtons[i].classList.length-1] === 'option-button-incorrect'){
            optionButtons[i].classList.toggle('option-button-incorrect');
        }
        optionButtons[i].innerHTML = questionsAndOptions[currentQuestionIndex-1].options[i];
    };

    if (currentQuestionIndex !== 1) {
        document.getElementById('question' + (currentQuestionIndex - 1)).classList.toggle('currentCircle');
        document.getElementById('question' + (currentQuestionIndex - 1)).classList.toggle('previousCircle');
        document.getElementById('question' + currentQuestionIndex).classList.toggle('nextCircle');
        document.getElementById('question' + currentQuestionIndex).classList.toggle('currentCircle');
    }
    
    submitButton.removeEventListener('click', nextQuestion);
    submitButton.addEventListener('click', validateAnswer);
}

function shuffleQuestions(){
    let i = questionsAndOptions.length-1;
    let temp = 0;
    let j = 0;

    while(i >= 0){
        j = Math.floor(Math.random() * (i));
        temp = questionsAndOptions[j];
        questionsAndOptions[j] = questionsAndOptions[i];
        questionsAndOptions[i] = temp;
        i--;
    }
}

shuffleQuestions();
nextQuestion();