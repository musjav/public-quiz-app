var questions = [
    {
        question: "1. Html Stands For _______________________",
        options: ["Hyper Text Makeup Language",
            "html",
            "Case Cading Style Sheet",
            "Hypertext markup language"
        ],
        correctAns: "Hypertext markup language",
    },
    {
        question: "2. Css Stands For _______________________",
        options: [
            "Casecading Style Sheet",
            "Java",
            "Ram",
            "Hypertext markup language"
        ],
        correctAns: "Casecading Style Sheet",
    },
    {
        question: "3. Js Stands For _______________________",
        options: [
            "Java Style",
            "Java Script",
            "Script",
            "Script Src"
        ],
        correctAns: "Java Script",
    },
    {
        question: "4. Dom Stands For _______________________",
        options: [
            "Document Object Model",
            "html",
            "Css",
            "Java"
        ],
        correctAns: "Document Object Model",
    },
    {
        question: "5. Ram Stands For _______________________",
        options: [
            "Read Only Memory",
            "Dom",
            "Random Acccess Memory",
            "For Pc"
        ],
        correctAns: "Random Acccess Memory",
    },
    {
        question: "6. Rom Stands For _______________________",
        options: [
            "Hyper Text Markup Language",
            "html",
            "HTml",
            "Read Only Memory"
        ],
        correctAns: "Read Only Memory",
    },
];
var index = 0;
var ques = document.getElementById('ques');
var opts = document.getElementById('opts');
var score = 0;
var outofques = document.getElementById('outofques');
var totalQuestions = questions.length;
function showQuestion() {
    opts.innerHTML = '';
    if (index < totalQuestions) {
        outofques.innerHTML = `${index + 1}/${totalQuestions}`
        ques.innerHTML = questions[index].question;
        for (var i = 0; i < questions[index].options.length; i++) {
            var currOptions = questions[index].options[i];
            var correctAns = questions[index].correctAns;
            opts.innerHTML += `
<div class="row">
    <div class="col-md-6 col-sm-12">
        <button onclick="checkQues('${currOptions}','${correctAns}')">${questions[index].options[i]}</button>
    </div>
</div>`;
        }
    }
    else {
        // // // Quiz has ended
        var percentage = (score / totalQuestions) * 100;
        percentage = percentage.toFixed(2);
        ques.innerHTML = `Quiz Ended! Your Score: ${score}/${totalQuestions} (${percentage}%)`;
        document.getElementById('restartBtn').style.display = 'block';
        // document.getElementById('nextBtn').style.display = 'none';
        // document.getElementById('prevBtn').style.display = 'none';
    }
}
showQuestion();
function checkQues(a, correctAns) {
    if (a === correctAns) {
        score++;
    }
    index++;
    showQuestion();

}
function restartQuiz() {
    index = 0;
    score = 0;
    document.getElementById('restartBtn').style.display = 'none';
    showQuestion();
    // console.log(index,score)
    // Enable the "Next" button by default
    // document.getElementById('nextBtn').style.display = 'block';
    // Hide the "Previous" button when restarting
    // document.getElementById('prevBtn').style.display = 'block';
    // Hide the "Restart" button when restarting
    // Display the first question
}
// // //================================================================FOR MAKING NEXT & PREVIOUS BUTTON UNCOMMENT ALL COMMENTS==============================================================
// // // ==========================================================PREVIOUS BUTTON
// function previousQuestion() {
//     if (index > 0) {
//         index--;
//         showQuestion()
//     }
// }
// // //=========================================================== NEXT BUTTON
// function nextQuestion() {
//     index++;
//     showQuestion()
// }

