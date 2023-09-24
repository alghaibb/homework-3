// VARIABLES
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue_btn");
const quiz_box = document.querySelector(".quiz_box");
const next_btn = quiz_box.querySelector(".next_btn");
const bottom_que_counter = quiz_box.querySelector(".total_que");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");

// Timer variables
let counter;
let timeValue = 30;

// Initialize question count and number
let que_count = 0;
let que_numb = 1;

// TICK & CROSS ICON
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// IF START BUTTON CLICKED
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // SHOWS INFO BOX
}

// IF QUIT BUTTON CLICKED
quit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // HIDES INFO BOX
}

// IF CONTINUE BUTTON CLICKED
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // HIDES INFO BOX
    quiz_box.classList.add("activeQuiz"); // SHOWS QUIZ BOX
    showQuestions(0);
    queCounter(1);
    startTimer(30);
}

// IF NEXT QUESTION BUTTON CLICKED
next_btn.addEventListener("click", () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        startTimer(timeValue);
    } else {
        console.log("Questions completed!");
        // Handle what to do when all questions are completed
    }
});

// QUESTIONS & OPTIONS FROM ARRAY
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", () => optionSelected(option[i]));
    }
}

// Display tick or cross icon based on the selected answer
function optionSelected(answer) {
    startTimer(timeValue);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is correct!");
        // Check if the tick icon is already present before adding it
        if (!answer.querySelector(".icon.tick")) {
            answer.insertAdjacentHTML("beforeend", tickIcon);
        }
    } else {
        answer.classList.add("incorrect");
        console.log("WRONG ANSWER LOL!");
        answer.insertAdjacentHTML("beforeend", crossIcon);
    }

    // IF ANSWER INCORRECT, PICK CORRECT ANSWER
    for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
            option_list.children[i].classList.add("correct");
            // Check if the tick icon is already present before adding it
            if (!option_list.children[i].querySelector(".icon.tick")) {
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // ONCE USER SELECTS ANSWER, DISABLE OTHER OPTIONS
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
}
// Start the timer
function startTimer(time) {
    clearInterval(counter); // Clear any previous timer
    counter = setInterval(timer, 1000);

    function timer() {
        if (timeValue <= 0) {
            clearInterval(counter);
            console.log("Time's up!");
            // Handle what to do when time runs out (e.g., show next question)
        } else {
            timeCount.textContent = timeValue;
            timeValue--;
        }
    }
}

// Update question counter
function queCounter(index) {
    let totalQuestCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_que_counter.innerHTML = totalQuestCountTag;
}

// Initialize the first question
showQuestions(0);
queCounter(1);
