// VARIABLES
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue_btn");
const quiz_box = document.querySelector(".quiz_box");

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
}
