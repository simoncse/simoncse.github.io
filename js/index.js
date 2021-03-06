import Setting from "./Setting.js";
import LanguageProvider from "./LanguageProvider.js";
import Cursor from "./cursor.js";
import Animation from "./Animation.js";
import Toast from "./Toast.js";
import contactForm from "./contactForm.js";

const languageProvider = new LanguageProvider('#dropdown');

if (!Setting.isMobile()) {
    //Cursor Animation
    const cursor = new Cursor('.cursor');
    cursor.setHoverSelectors(
        ['.about>p', 'h3', , '.skills > ul', 'h2>span', '.btn']
    );
    cursor.setHoverSelectors(['h1>span', 'h4>span', '.screen'], 'large');
    cursor.runInteractive();
}



// Section Animation
const observer = new IntersectionObserver(Animation.tracking, { threshold: [.20, .40] })


const sections = document.querySelectorAll('section');

sections.forEach(section => {
    observer.observe(section);

})


// Contact Form
const URL = 'https://simoncse.netlify.app/sendmail';

contactForm.handleSubmit(async (formData) => {
    const messages = {
        success: languageProvider.messages('contactSuccess'),
        error: languageProvider.messages('contactError')
    }

    try {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(formData)
        })
        await res.json();
        Toast.show(messages.success);
        contactForm.resetInput();

    } catch (error) {
        Toast.show(messages.error, "error");
        console.log(error);
    }

})

