// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { ref, set, getDatabase, push, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQc3iaztIVvxhBt2EkGx-XHHH5SgeEbqE",
    authDomain: "portofolio-c7959.firebaseapp.com",
    databaseURL: "https://portofolio-c7959-default-rtdb.firebaseio.com",
    projectId: "portofolio-c7959",
    storageBucket: "portofolio-c7959.appspot.com",
    messagingSenderId: "1005412350505",
    appId: "1:1005412350505:web:af52f4d9b510fcb0347a38",
    measurementId: "G-97401QYN86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase();


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
        // Send the formatted percentage value to Firebase
        // firebase.database().ref('path/to/your/data').set({
        //     percentage: percentage
        // }).then(() => {
        //     console.log("Percentage value sent successfully to Firebase!");
        // }).catch((error) => {
        //     console.error("Error sending percentage value to Firebase:", error);
        // });
        endQuiz();
    }
}
// showQuestion();
window.checkQues = function (a, correctAns) {
    // if (a === correctAns) {
    //     score++;
    // }
    // database.ref(questions.length).push({
    //     question: questions[index].question,
    //     options: questions[index].options,
    //     correctAns: questions[index].correctAns
    //   });

    // index++;
    // showQuestion();
    if (a === correctAns) {
        score++;
    }
    const db = getDatabase();
    const questionsRef = ref(db, 'questions');
    push(questionsRef, {
        question: questions[index].question,
        options: questions[index].options,
        correctAns: questions[index].correctAns
    }).then(() => {
        console.log("Question added to Firebase!");
    }).catch((error) => {
        console.error("Error adding question to Firebase:", error);
    });

    index++;
    showQuestion();

}
window.restartQuiz = function () {
    // database.ref(questions.length).remove();

    // document.getElementById('restartBtn').style.display = 'none';

    // index = 0;
    // score = 0;
    // document.getElementById('restartBtn').style.display = 'none';
    // showQuestion();
    const db = getDatabase();
    const questionsRef = ref(db, 'questions');
    set(questionsRef, null).then(() => {
        console.log("Questions cleared from Firebase!");
    }).catch((error) => {
        console.error("Error clearing questions from Firebase:", error);
    });

    document.getElementById('restartBtn').style.display = 'none';

    index = 0;
    score = 0;
    showQuestion();
}
window.sendPercentageToFirebase = function (percentage) {
    // Get a reference to the root of the database
    const dbRef = getDatabase();

    // Push the percentage value to a new child node under "Tasks"
    const tasksRef = ref(dbRef, 'Tasks');
    push(tasksRef, {
        percentage: percentage
    }).then(() => {
        console.log("Percentage value sent successfully to Firebase!");
    }).catch((error) => {
        console.error("Error sending percentage value to Firebase:", error);
    });
}


window.endQuiz = function () {
    // Calculate percentage
    var percentage = (score / totalQuestions) * 100;
    percentage = percentage.toFixed(2);

    // Display quiz result
    ques.innerHTML = `Quiz Ended! Your Score: ${score}/${totalQuestions} (${percentage}%)`;
    document.getElementById('restartBtn').style.display = 'block';

    // Send percentage to Firebase
    sendPercentageToFirebase(percentage);
}

showQuestion();
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

