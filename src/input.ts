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

type personalInfo = {
  id: number;
  text: string;
  placeholder: string;
  isRequired: boolean;
}

function personalInfoItem(): personalInfo[] {
  return [
    {
      id: 1,
      text: "Company Name*",
      placeholder: "Please enter your company name",
      isRequired: true
    }, {
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
    },

  ]
}
function renderPersonalInfo(questions: personalInfo[]): string {
  return questions
    .map(
      (q) => `
              <div class="infoQestion">
              <label for="personalInfo${q.id}" class="form-label"
                >${q.text}</label
              >
              <input
                type="email"
                class="form-control"
                id="personalInfo${q.id}"
                placeholder="${q.placeholder}"
              />
              </div>  `
    )
    .join("");
}

// render personal info
const info = document.querySelector<HTMLDivElement>("#info");
if (info) {
  // console.log(info);
  const questions = personalInfoItem();
  const infoHTML = renderPersonalInfo(questions);
  info.innerHTML = infoHTML;
}


// $Questionnaire
type Question = {
  id: number;
  text: string;
  description: string;
  options: number[];
};

function generateQuestionnaire(): Question[] {
  return [
    {
      id: 1,
      text: "How satisfied are you with the venue for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 2,
      text: "How satisfied are you with the meeting schedule for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 3,
      text: "How satisfied are you with the catering for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 4,
      text: "How satisfied are you with the accommodation for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 5,
      text: "How satisfied are you with the type of the meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 6,
      text: "How satisfied are you with the app (application) for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 7,
      text: "How satisfied are you with the transportation convenience for this meeting?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 8,
      text: "How satisfied are you with this annual meeting overall?",
      description: "1 – 5 : Not satisfied / 6 – 7 : Basically satisfied / 8 – 9 : Good / 10 : Perfect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  ];
}
function renderQuestionnaire(questions: Question[]): string {
  return questions
    .map(
      (q) => `
      <div class="question radioQuestion" id="question${q.id}">
        <h5>${q.text}</h5>
        <p>${q.description}</p>
        <div class="options">
          ${q.options
          .map(
            (option) => `
            <input type="radio" class="btn-check" id="question${q.id}-option${option}" name="question${q.id}" value="${option}" autocomplete="off">
            <label class="btn btn-white" for="question${q.id}-option${option}">${option}</label>
            `
          )
          .join("")}
        </div>
        <h6 class="warning">Please select an option.</h6>
      </div>
    `
    )
    .join("");
}


// render questions
const form = document.querySelector<HTMLDivElement>("#form");
if (form) {
  const questions = generateQuestionnaire();
  const formHTML = renderQuestionnaire(questions);
  form.innerHTML = formHTML;

  const allRadioButtons = document.querySelectorAll<HTMLInputElement>("input[type='radio']");
  allRadioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const questionDiv = radio.closest<HTMLDivElement>(".radioQuestion");
      const warning = questionDiv?.querySelector<HTMLDivElement>(".warning");
      if (warning) {
        warning.style.display = "none";
      }
    });
  });
}


// add reasons input
const reasonsTemplate = `      
<div class="form-floating formWidth">
  <textarea class="form-control" placeholder="" id="floatingTextarea2" style="height: 50px"></textarea>
  <label for="floatingTextarea2">Reasons</label>
</div>`;




const question8 = document.querySelector("#question8");
if (question8) {
  question8.insertAdjacentHTML("beforeend", reasonsTemplate);
}

// Submit

const submitBtn = document.querySelector<HTMLAnchorElement>("#submit");

if (submitBtn) {
  submitBtn.addEventListener("click", (e: MouseEvent) => {
    let isValid: boolean = true;

    // validate questions1~8
    const questions = document.querySelectorAll<HTMLDivElement>(".radioQuestion");
    questions.forEach((question) => {
      const questionId = question.getAttribute("id");
      if (questionId) {
        const selectedOption = question.querySelector<HTMLInputElement>(`input[type="radio"][name="${questionId}"]:checked`);
        const warning = question.querySelector<HTMLDivElement>(".warning");

        if (!selectedOption) {
          if (warning) warning.style.display = "block";
          isValid = false;
        } else {
          if (warning) warning.style.display = "none";
        }
      }
    });

    // validate personal info
    const personalInfoItems = personalInfoItem();
    personalInfoItems.forEach((item) => {
      if (item.isRequired) {
        const input = document.querySelector<HTMLInputElement>(`#personalInfo${item.id}`);
        if (input && input.value.trim() === "") {
          input.style.borderColor = "red";
          isValid = false;
        } else if (input) {
          input.style.borderColor = "";
        }
      }
    });


    const personalInfoInputs = document.querySelectorAll<HTMLInputElement>(".infoQestion input");
    personalInfoInputs.forEach((input) => {
      input.addEventListener("input", () => {
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













