const PHRASES = {
    en: {
        contactSuccess: "Your message has been sent.",
        contactError: "Cannot send the message. Please try again."
    },
    zh: {
        contactSucess: '',
        contactError: ''
    }
}


export default class LanguageProvider {

    constructor(selector) {
        this.dropdown = document.querySelector(selector);
        // this.btn = this.dropdown.querySelector('button');
        this.langOptions = this.dropdown.querySelector('.dropdown-content');

        this.lang = document.documentElement.lang;

        document.addEventListener('click', e => {
            const isDropdown = e.target.closest(selector)

            if (isDropdown && e.target.matches('button')) {
                this.langOptions.classList.toggle('hide');
                return;
            }

            if (isDropdown) {
                this.langOptions.classList.remove('hide');
                return;
            }

            if (!isDropdown) {
                this.langOptions.classList.add('hide');
                return;

            }

        })
    }

    messages(key) {
        return PHRASES[this.lang][key];
    }
}