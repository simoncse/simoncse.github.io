import Cursor from "./cursor.js";
import Animation from "./Animation.js";
import contactForm from "./contactForm.js";
import Toast from "./Toast.js";


//Cursor Animation
const cursor = new Cursor('.cursor');
cursor.setHoverSelectors(
    ['.about>p', 'h3', , '.skills > ul', 'h2>span', '.btn']
);
cursor.setHoverSelectors(['h1>span', 'h4>span', '.screen'], 'large');
cursor.runInteractive();


// Section Animation
const observer = new IntersectionObserver(Animation.tracking, { threshold: [0.20, 0.40] })


const sections = document.querySelectorAll('section');
console.log(sections);
sections.forEach(section => {
    observer.observe(section);

})


// Contact Form
const URL = 'https://simoncse.netlify.app/sendmail';

contactForm.handleSubmit(async (formData) => {
    try {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(formData)
        })
        const { result } = await res.json();
        Toast.show("Your message has been sent.");
        contactForm.resetInput();
        console.log(result);

    } catch (error) {
        Toast.show("Cannot send the message. Please try again.", "error");
        console.log(error);
    }

})


