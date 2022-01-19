



export default class LanguageProvider {


    constructor(selector) {
        this.dropdown = document.querySelector(selector);
        this.langOptions = this.dropdown.querySelector('.dropdown-content');
        // this.dropdown = this.btn.parentNode;
        //click event
        document.addEventListener('click', e => {
            const isDropdown = e.target.closest(selector)
            if (isDropdown) {
                this.dropdown.classList.toggle('active');
                this.langOptions.classList.toggle('hide');
            }

            if (!isDropdown) {
                this.dropdown.classList.remove('active');
                this.langOptions.classList.add('hide');

            }

        })
    }

}