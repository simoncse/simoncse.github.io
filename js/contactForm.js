/*This will handle validation and export a form submit function with 
  form data that are validated and ready to call AJAX 
*/

let shouldValidate = false;
let isFormValid = false;

const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const subjectInput = document.querySelector("input[name='subject']");
const messageInput = document.querySelector("textarea[name='message']");
const submitBtn = document.querySelector("#submitBtn");

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
            submitBtn.classList.remove('spinner');
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

inputFields.forEach((input) => input.addEventListener("input", validateInputs));



export default {
    handleSubmit(callback) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            submitBtn.classList.add('spinner');
            shouldValidate = true;

            validateInputs();
            if (!isFormValid) return;

            const formData = {
                name: nameInput.value,
                subject: subjectInput.value,
                email: emailInput.value,
                message: messageInput.value
            };

            await callback(formData);

            submitBtn.classList.remove('spinner')
        })
    },

    resetInput() {
        submitBtn.classList.remove('spinner');
        inputFields.forEach(input => {
            input.value = '';
        })
        shouldValidate = false;

    },

    setPending(pending) {
        pending ? submitBtn.classList.add('spinner') : submitBtn.classList.remove('spinner');
    }


}





