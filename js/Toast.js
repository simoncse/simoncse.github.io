import { gsap } from "gsap";


//initialize HTML DOM Element before insertion

const toast = document.createElement("div");
const icon = document.createElement('div');
const span = document.createElement('span');
const closeBtn = document.createElement('button');

closeBtn.innerHTML = "&times;"

span.innerText = ''

toast.appendChild(icon);
toast.appendChild(span);
toast.appendChild(closeBtn);

//Animation
const fadeIn = gsap.timeline(
    {
        paused: true,
        onReverseComplete: () => {
            document.querySelector('.toast').remove();
        }
    });


fadeIn.from(toast, { x: 65, autoAlpha: 0, duration: 0.7 })




closeBtn.addEventListener('click', e => {
    console.log(e.target.parentElement);
    fadeIn.reverse()
})

export default {

    show(msg, type = "success") {
        span.innerText = msg;
        toast.className = `toast toast--${type}`;
        icon.className = `check check--${type}`;
        document.body.appendChild(toast);
        fadeIn.play();
    }

}