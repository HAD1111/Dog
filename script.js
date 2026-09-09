const screens = {
    welcome: document.getElementById("welcomeScreen"),
    question: document.getElementById("questionScreen"),
    loading: document.getElementById("loadingScreen"),
    result: document.getElementById("resultScreen")
};

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const progressBar = document.getElementById("progressBar");
const loadingTitle = document.getElementById("loadingTitle");
const loadingText = document.getElementById("loadingText");

const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const factBox = document.getElementById("factBox");


function showScreen(screen) {
    Object.values(screens).forEach(s => {
        s.classList.remove("active");
    });

    screen.classList.add("active");
}


// =========================
// START
// =========================

startBtn.addEventListener("click", () => {
    showScreen(screens.question);
});


// =========================
// ANSWER
// =========================

document.querySelectorAll(".choice").forEach(button => {

    button.addEventListener("click", () => {

        const answer = button.dataset.answer;

        showScreen(screens.loading);

        runInvestigation(answer);
    });

});


// =========================
// INVESTIGATION
// =========================

function runInvestigation(answer) {

    progressBar.style.width = "0%";
    loadingTitle.textContent = "جاري التفكير...";

    const messages = [
        "تحليل البيانات...",
        "التحقق من الهوية...",
        "فحص مستوى الكلبية...",
        "مقارنة النتائج مع قاعدة بيانات الكلاب...",
        "استشارة خبراء الجعارة...",
        "مراجعة الأدلة...",
        "الحسابات شبه مكتملة...",
        "استخراج النتيجة النهائية..."
    ];

    let progress = 0;
    let messageIndex = 0;

    loadingText.textContent = messages[0];

    // Progress bar
    const progressInterval = setInterval(() => {

        progress += 2.5;

        if (progress > 100) {
            progress = 100;
        }

        progressBar.style.width = `${progress}%`;

        // Change text every ~12.5%
        const newIndex = Math.min(
            Math.floor(progress / 12.5),
            messages.length - 1
        );

        if (newIndex !== messageIndex) {
            messageIndex = newIndex;
            loadingText.textContent = messages[messageIndex];
        }

        if (progress >= 100) {
            clearInterval(progressInterval);

            // Give the user a tiny moment to see 100%
            setTimeout(() => {
                showResult(answer);
            }, 500);
        }

    }, 100);
}


// =========================
// RESULT
// =========================

function showResult(answer) {

    if (answer === "yes") {

        resultEmoji.textContent = "🐕";

        resultTitle.textContent = "النتيجة: 100% كلب";

        resultText.innerHTML = `
            للأسف، الأدلة دامغة.<br>
            بما أنك علي محفوظ، فإن نسبة الكلبية لديك وصلت إلى
            <strong>100%</strong>.
        `;

        factBox.style.display = "none";

    } else {

        resultEmoji.textContent = "🎉";

        resultTitle.textContent = "مبروك! أنت مش كلب";

        resultText.innerHTML = `
            تم التأكد من هويتك بنجاح.<br>
            لا توجد أي أدلة تشير إلى أنك كلب.
        `;

        factBox.style.display = "flex";
    }

    showScreen(screens.result);
}


// =========================
// RESTART
// =========================

restartBtn.addEventListener("click", () => {

    progressBar.style.width = "0%";

    showScreen(screens.welcome);
});