const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .Quit");
const continue_btn = info_box.querySelector(".buttons .Restart");
const quiz_box = document.querySelector(".Quiz_box")
const option_list =  document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    counter(1);
    startTimer(600)
}

let question_count = 0;
let question_number = 1;
let correctanswers = 0;
let count;

const next_btn = quiz_box.querySelector(".next_btn")
const results = document.querySelector(".results_box")
const restart = results.querySelector(".buttons .Restart")
const exit = results.querySelector(".buttons .Quit")

restart.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    results.classList.remove("activeResults")
    let question_count = 0;
    let question_number = 1;
    let correctanswers = 0;
    showQuestions(0);
    clearInterval(count)
    counter(1);
    startTimer(600)
}

exit.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    if(question_count < questions.length - 1){
        question_count++;
        question_number++;
        showQuestions(question_count);
        counter(question_number)
    }else{
        console.log("Questions completed")
        showResults()
    }

}

function showQuestions(index){
    const question_text =  document.querySelector(".question_text");
    const question_image = quiz_box.querySelector(".image")
    let question_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "<span>";
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[4] + '<span></span></div>'
    let image_tag = '<img class="question_image"src=' + questions[index].image + '></img>'
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    question_image.innerHTML = image_tag
    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)")   
    }
}

function optionSelected(answer){
    let useranswer = answer.textContent;
    answer.classList.add("selected")
    let correctanswer = questions[question_count].answer;
    let allOptions = option_list.children.length
    if(useranswer == correctanswer){
        console.log("Correct")
        correctanswers += 1
        console.log(correctanswers)
    }else{
        console.log("Incorrect")
        console.log(correctanswers)
    }

    for (let i =0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
}

function startTimer(time){
    count = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(timer)
            showResults()
        }
    }
}

function showResults(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    results.classList.add("activeResults")
    const score = results.querySelector(".score_text")
    score_tag = '<span> You scored <p>' + correctanswers + '</p> out of <p>' + questions.length + '</p></span>'
    score.innerHTML = score_tag
}

function counter(index){
    const question_counter = quiz_box.querySelector(".total_questions");
    let count_tag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions<span>';
    question_counter.innerHTML = count_tag;
}