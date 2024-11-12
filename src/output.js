//------------------//
// index
//------------------//
//$1. form
//$Personal Info
//$Questionnaire
//------------------//
// $1. form
//------------------//
// $Personal Info
function personalInfoItem() {
    return [
        {
            id: 1,
            text: "Company Name*",
            placeholder: "Please enter your company name",
            isRequired: true
        },
        {
            id: 2,
            text: "Name*",
            placeholder: "Please enter your name",
            isRequired: true
        },
        {
            id: 3,
            text: "Position",
            placeholder: "Please enter your position",
            isRequired: false
        },
        {
            id: 4,
            text: "Email*",
            placeholder: "sample@email.com",
            isRequired: true
        }
    ];
}
function renderPersonalInfo(questions) {
    return questions.map(function(q) {
        return '\n              <div class="infoQestion">\n              <label for="personalInfo'.concat(q.id, '" class="form-label"\n                >').concat(q.text, '</label\n              >\n              <input\n                type="email"\n                class="form-control"\n                id="personalInfo').concat(q.id, '"\n                placeholder="').concat(q.placeholder, '"\n              />\n              </div>  ');
    }).join("");
}
// render personal info
var info = document.querySelector("#info");
if (info) {
    // console.log(info);
    var questions = personalInfoItem();
    var infoHTML = renderPersonalInfo(questions);
    info.innerHTML = infoHTML;
}
function generateQuestionnaire() {
    return [
        {
            id: 1,
            text: "How satisfied are you with the venue for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 2,
            text: "How satisfied are you with the meeting schedule for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 3,
            text: "How satisfied are you with the catering for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 4,
            text: "How satisfied are you with the accommodation for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 5,
            text: "How satisfied are you with the type of the meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 6,
            text: "How satisfied are you with the app (application) for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 7,
            text: "How satisfied are you with the transportation convenience for this meeting?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        },
        {
            id: 8,
            text: "How satisfied are you with this annual meeting overall?",
            description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
            ]
        }
    ];
}
function renderQuestionnaire(questions) {
    return questions.map(function(q) {
        return '\n      <div class="question radioQuestion" id="question'.concat(q.id, '">\n        <h5>').concat(q.text, "</h5>\n        <p>").concat(q.description, '</p>\n        <div class="options">\n          ').concat(q.options.map(function(option) {
            return '\n            <input type="radio" class="btn-check" id="question'.concat(q.id, "-option").concat(option, '" name="question').concat(q.id, '" value="').concat(option, '" autocomplete="off">\n            <label class="btn btn-white" for="question').concat(q.id, "-option").concat(option, '">').concat(option, "</label>\n            ");
        }).join(""), '\n        </div>\n        <h6 class="warning">Please select an option.</h6>\n      </div>\n    ');
    }).join("");
}
// render questions
var form = document.querySelector("#form");
if (form) {
    var questions1 = generateQuestionnaire();
    var formHTML = renderQuestionnaire(questions1);
    form.innerHTML = formHTML;
    var allRadioButtons = document.querySelectorAll("input[type='radio']");
    allRadioButtons.forEach(function(radio) {
        radio.addEventListener("change", function() {
            var questionDiv = radio.closest(".radioQuestion");
            var warning = questionDiv === null || questionDiv === void 0 ? void 0 : questionDiv.querySelector(".warning");
            if (warning) {
                warning.style.display = "none";
            }
        });
    });
}
// add reasons input
var reasonsTemplate = '      \n<div class="form-floating formWidth">\n  <textarea class="form-control" placeholder="" id="floatingTextarea2" style="height: 50px"></textarea>\n  <label for="floatingTextarea2">Reasons</label>\n</div>';
var question8 = document.querySelector("#question8");
if (question8) {
    question8.insertAdjacentHTML("beforeend", reasonsTemplate);
}
// Submit
var submitBtn = document.querySelector("#submit");
if (submitBtn) {
    submitBtn.addEventListener("click", function(e) {
        var isValid = true;
        // validate questions1~8
        var questions = document.querySelectorAll(".radioQuestion");
        questions.forEach(function(question) {
            var questionId = question.getAttribute("id");
            if (questionId) {
                var selectedOption = question.querySelector('input[type="radio"][name="'.concat(questionId, '"]:checked'));
                var warning = question.querySelector(".warning");
                if (!selectedOption) {
                    if (warning) warning.style.display = "block";
                    isValid = false;
                } else {
                    if (warning) warning.style.display = "none";
                }
            }
        });
        // validate personal info
        var personalInfoItems = personalInfoItem();
        personalInfoItems.forEach(function(item) {
            if (item.isRequired) {
                var input = document.querySelector("#personalInfo".concat(item.id));
                if (input && input.value.trim() === "") {
                    input.style.borderColor = "red";
                    isValid = false;
                } else if (input) {
                    input.style.borderColor = "";
                }
            }
        });
        var personalInfoInputs = document.querySelectorAll(".infoQestion input");
        personalInfoInputs.forEach(function(input) {
            input.addEventListener("input", function() {
                if (input.value.trim() !== "") {
                    input.style.borderColor = "";
                }
            });
        });
        // all done!!
        if (!isValid) {
            e.preventDefault();
            console.log("未完成");
        } else {
            console.log("完成");
            window.location.href = "questionnaire-completed.html";
        }
    });
}

