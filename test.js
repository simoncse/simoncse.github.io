console.log("testing");

const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const subjectInput = document.querySelector("input[name='subject']");
const messageInput = document.querySelector("textarea[name='message']");

nameInput.isValid = () => !!nameInput.value;
subjectInput.isValid = () => !!subjectInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, subjectInput, messageInput]



const validateInputs = () => {
    if (!shouldValidate) return;

    isFormValid = true;
    inputFields.forEach((input) => {
        input.classList.remove("invalid");
        input.nextElementSibling.classList.add("hidden");

        if (!input.isValid()) {
            input.classList.add("invalid");
            isFormValid = false;
            input.nextElementSibling.classList.remove("hidden");
        }
    });
}


const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

let shouldValidate = false;
let isFormValid = false;




contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    shouldValidate = true;

    validateInputs();
    if (!isFormValid) return;

    dataObj = {
        name: nameInput.value,
        subjec: subjectInput.value,
        email: emailInput.value,
        message: messageInput.value
    }


    try {
        const res = await fetch("/api/test1", {
            method: "POST",
            body: JSON.stringify(dataObj)
        })
        const result = await res.json()

    } catch (error) {
        console.log(error);

    }

})

inputFields.forEach((input) => input.addEventListener("input", validateInputs));