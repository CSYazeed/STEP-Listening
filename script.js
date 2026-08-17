/* =========================================================
   YAZEED ENGLISH — STEP LISTENING PRACTICE
   ========================================================= */


/* =========================================================
   LISTENING DATA
   =========================================================

   Add your questions here.

   Each listening has:
   - audio: the MP3 file
   - questions: all questions related to that MP3

   Each question has:
   - question: English question
   - answers: at least 3 answers
   - correct: the number of the correct answer

   Example:

   {
       question: "Where does the man work?",
       answers: [
           "At a hospital",
           "At a bank",
           "At a school"
       ],
       correct: 1
   }

   "correct: 1" means the SECOND answer is correct
   because JavaScript starts counting from 0.

   0 = first answer
   1 = second answer
   2 = third answer
   ========================================================= */

const LISTENING_DATA = [

    {
        audio: "audio/listening-1.mp3",

        questions: [
            {
                question: "From the conversation, how did the man probably find out about Dr. Carter?",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            },

            {
                question: "Add your second question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 1
            },

            {
                question: "Add your third question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 2
            }
        ]
    },


    {
        audio: "audio/listening-02.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-03.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-04.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-05.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-06.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-07.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-08.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-09.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    },


    {
        audio: "audio/listening-10.mp3",

        questions: [
            {
                question: "Add your question here.",
                answers: [
                    "Answer A",
                    "Answer B",
                    "Answer C",
                    "Answer D"
                ],
                correct: 0
            }
        ]
    }

];


/* =========================================================
   ELEMENTS
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const audioPlayer =
    document.getElementById("audioPlayer");

const playPauseBtn =
    document.getElementById("playPauseBtn");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volumeBar =
    document.getElementById("volumeBar");

const muteBtn =
    document.getElementById("muteBtn");

const speedSelect =
    document.getElementById("speedSelect");

const restartAudioBtn =
    document.getElementById("restartAudioBtn");

const questionsContainer =
    document.getElementById("questionsContainer");

const listeningNumber =
    document.getElementById("listeningNumber");

const audioTitleNumber =
    document.getElementById("audioTitleNumber");

const questionCountLabel =
    document.getElementById("questionCountLabel");

const correctCount =
    document.getElementById("correctCount");

const incorrectCount =
    document.getElementById("incorrectCount");

const nextListeningBtn =
    document.getElementById("nextListeningBtn");

const nextMessage =
    document.getElementById("nextMessage");


/* =========================================================
   STATE
   ========================================================= */

let currentListeningIndex = 0;

let totalCorrect = 0;

let totalIncorrect = 0;


/*
   This stores whether each question has already
   been answered.

   Example:

   answeredQuestions[0] = true

   means question 1 of the current listening
   has already been answered.
*/
let answeredQuestions = [];


/* =========================================================
   THEME
   ========================================================= */

function updateThemeIcon() {

    const isDark =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";
}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();
    }
);


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");
}


updateThemeIcon();


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsPart).padStart(2, "0")
    );
}


/* =========================================================
   LOAD LISTENING
   ========================================================= */

function loadListening(index) {

    if (
        index < 0 ||
        index >= LISTENING_DATA.length
    ) {
        return;
    }


    currentListeningIndex = index;


    const listening =
        LISTENING_DATA[index];


    /* Reset question states */
    answeredQuestions =
        new Array(
            listening.questions.length
        ).fill(false);


    /* Update heading */

    listeningNumber.textContent =
        index + 1;

    audioTitleNumber.textContent =
        index + 1;


    questionCountLabel.textContent =
        `${listening.questions.length} أسئلة`;


    /* Load audio */

    audioPlayer.pause();

    audioPlayer.src =
        listening.audio;

    audioPlayer.load();


    playPauseBtn.textContent =
        "▶";


    progressBar.value =
        0;


    currentTime.textContent =
        "00:00";


    duration.textContent =
        "00:00";


    /* Reset playback speed */

    audioPlayer.playbackRate =
        Number(speedSelect.value);


    /* Render questions */

    renderQuestions(
        listening.questions
    );


    updateNextButton();
}


/* =========================================================
   RENDER QUESTIONS
   ========================================================= */

function renderQuestions(questions) {

    questionsContainer.innerHTML = "";


    questions.forEach(
        (question, questionIndex) => {

            const card =
                document.createElement("article");

            card.className =
                "question-card";


            const top =
                document.createElement("div");

            top.className =
                "question-top";


            const number =
                document.createElement("div");

            number.className =
                "question-number";

            number.textContent =
                String(
                    questionIndex + 1
                ).padStart(2, "0");


            const questionText =
                document.createElement("h3");

            questionText.className =
                "question-text";

            questionText.textContent =
                question.question;


            top.appendChild(number);

            top.appendChild(questionText);


            const answers =
                document.createElement("div");

            answers.className =
                "answers";


            question.answers.forEach(
                (answer, answerIndex) => {

                    const button =
                        document.createElement("button");

                    button.type =
                        "button";

                    button.className =
                        "answer-btn";

                    button.textContent =
                        answer;


                    button.addEventListener(
                        "click",
                        () => {

                            handleAnswer(
                                questionIndex,
                                answerIndex,
                                card,
                                answers,
                                question
                            );

                        }
                    );


                    answers.appendChild(button);
                }
            );


            const result =
                document.createElement("div");

            result.className =
                "answer-result";

            result.hidden =
                true;


            card.appendChild(top);

            card.appendChild(answers);

            card.appendChild(result);


            questionsContainer.appendChild(card);

        }
    );
}


/* =========================================================
   HANDLE ANSWER
   ========================================================= */

function handleAnswer(
    questionIndex,
    selectedAnswerIndex,
    card,
    answersContainer,
    question
) {

    /*
       If this question has already been answered,
       do nothing.
    */

    if (
        answeredQuestions[questionIndex]
    ) {
        return;
    }


    /*
       Lock the question.
    */

    answeredQuestions[questionIndex] =
        true;


    const answerButtons =
        answersContainer.querySelectorAll(
            ".answer-btn"
        );


    answerButtons.forEach(
        (button) => {

            button.disabled =
                true;
        }
    );


    const result =
        card.querySelector(
            ".answer-result"
        );


    const isCorrect =
        selectedAnswerIndex ===
        question.correct;


    /* =====================================================
       CORRECT
       ===================================================== */

    if (isCorrect) {

        totalCorrect++;

        correctCount.textContent =
            totalCorrect;


        answerButtons[
            selectedAnswerIndex
        ].classList.add(
            "correct"
        );


        result.hidden =
            false;

        result.className =
            "answer-result correct-message";


        result.innerHTML = `
            <span class="result-icon">✓</span>
            <span>اجابة صحيحة</span>
        `;

    }


    /* =====================================================
       INCORRECT
       ===================================================== */

    else {

        totalIncorrect++;

        incorrectCount.textContent =
            totalIncorrect;


        /*
           Mark the selected answer red.
        */

        answerButtons[
            selectedAnswerIndex
        ].classList.add(
            "incorrect"
        );


        /*
           Reveal the correct answer in green.
        */

        answerButtons[
            question.correct
        ].classList.add(
            "correct-reveal"
        );


        result.hidden =
            false;

        result.className =
            "answer-result incorrect-message";


        result.innerHTML = `
            <span class="result-icon">✕</span>
            <span>
                اجابة خاطئة
                <strong>
                </strong>
            </span>
        `;
    }


    updateNextButton();
}


/* =========================================================
   ESCAPE HTML
   =========================================================

   This protects the question/answer text if you
   later use characters such as < or >.
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   CHECK WHETHER ALL QUESTIONS ARE ANSWERED
   ========================================================= */

function allQuestionsAnswered() {

    return answeredQuestions.length > 0 &&
        answeredQuestions.every(
            (answered) => answered === true
        );
}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

function updateNextButton() {

    const isLastListening =
        currentListeningIndex ===
        LISTENING_DATA.length - 1;


    if (!allQuestionsAnswered()) {

        nextListeningBtn.disabled =
            true;

        nextMessage.textContent =
            "أجب عن جميع الأسئلة للانتقال إلى المقطع التالي.";

        return;
    }


    /*
       All questions are answered.
    */

    nextListeningBtn.disabled =
        false;


    if (isLastListening) {

        nextMessage.textContent =
            "لقد أكملت جميع مقاطع الاستماع.";

        nextListeningBtn.innerHTML =
            `
                اكتمل الاستماع
                <span>✓</span>
            `;

    } else {

        nextMessage.textContent =
            "أحسنت! يمكنك الانتقال إلى المقطع التالي.";

        nextListeningBtn.innerHTML =
            `
                التالي
                <span>←</span>
            `;
    }
}


nextListeningBtn.addEventListener(
    "click",
    () => {

        const isLastListening =
            currentListeningIndex ===
            LISTENING_DATA.length - 1;


        if (!allQuestionsAnswered()) {
            return;
        }


        if (isLastListening) {
            return;
        }


        loadListening(
            currentListeningIndex + 1
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================================
   PLAY / PAUSE
   ========================================================= */

playPauseBtn.addEventListener(
    "click",
    () => {

        if (audioPlayer.paused) {

            audioPlayer.play().catch(
                (error) => {

                    console.error(
                        "Audio playback failed:",
                        error
                    );

                }
            );

        } else {

            audioPlayer.pause();
        }
    }
);


audioPlayer.addEventListener(
    "play",
    () => {

        playPauseBtn.textContent =
            "❚❚";
    }
);


audioPlayer.addEventListener(
    "pause",
    () => {

        playPauseBtn.textContent =
            "▶";
    }
);


/* =========================================================
   AUDIO PROGRESS
   ========================================================= */

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (!audioPlayer.duration) {
            return;
        }


        progressBar.value =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );
    }
);


audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audioPlayer.duration
            );

        currentTime.textContent =
            "00:00";

        progressBar.value =
            0;
    }
);


audioPlayer.addEventListener(
    "ended",
    () => {

        playPauseBtn.textContent =
            "▶";
    }
);


/* =========================================================
   PROGRESS BAR
   ========================================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!audioPlayer.duration) {
            return;
        }


        audioPlayer.currentTime =
            (
                Number(
                    progressBar.value
                ) / 100
            ) *
            audioPlayer.duration;
    }
);


/* =========================================================
   VOLUME
   ========================================================= */

volumeBar.addEventListener(
    "input",
    () => {

        audioPlayer.volume =
            Number(volumeBar.value);


        if (audioPlayer.volume === 0) {

            muteBtn.textContent =
                "🔇";

        } else {

            muteBtn.textContent =
                "🔊";
        }
    }
);


/* =========================================================
   MUTE
   ========================================================= */

let previousVolume = 1;


muteBtn.addEventListener(
    "click",
    () => {

        if (audioPlayer.muted) {

            audioPlayer.muted =
                false;

            audioPlayer.volume =
                previousVolume;

            volumeBar.value =
                previousVolume;

            muteBtn.textContent =
                "🔊";

        } else {

            previousVolume =
                audioPlayer.volume || 1;

            audioPlayer.muted =
                true;

            volumeBar.value =
                0;

            muteBtn.textContent =
                "🔇";
        }
    }
);


/* =========================================================
   PLAYBACK SPEED
   ========================================================= */

speedSelect.addEventListener(
    "change",
    () => {

        audioPlayer.playbackRate =
            Number(
                speedSelect.value
            );
    }
);


/* =========================================================
   RESTART AUDIO
   ========================================================= */

restartAudioBtn.addEventListener(
    "click",
    () => {

        audioPlayer.currentTime =
            0;

        audioPlayer.play().catch(
            () => {}
        );
    }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

loadListening(0);
