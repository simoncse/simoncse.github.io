import { gsap } from "gsap";

const heroAnim = gsap.timeline({ repeat: 0, delay: .45 });
const overviewAnim = gsap.timeline({ paused: true, delay: .35 });
const projectsAnim = gsap.timeline({ paused: true });

heroAnim
    .to('.gear-1', { rotation: 65, duration: 2, ease: 'none' })
    .to('.gear-2', { rotation: 65, duration: 2, ease: 'none' }, '<')
    .to('.gear-1', { opacity: 1 }, 0.1)
    .to('.gear-2', { opacity: 1 }, 0.1)
    .from('.hero__logo', { x: 180, opacity: 0, duration: 1.2, ease: 'power2.easInOut' }, 0)
    .from('.hero__text', { y: -50, opacity: 0, duration: 1.3, ease: 'power2.easeInOut' }, 0.2)

overviewAnim
    .from('.about', { opacity: 0, y: -50, ease: 'power3.easeInOut' })
    .from('.skills', { opacity: 0, y: -50, ease: 'power3.easeInOut' }, '-=0.7');


projectsAnim
    .from('.projects__list article', { opacity: 0, x: -50, duration: .75, ease: 'power3.easeInOut', stagger: 0.6 })


let firstTime = true;


export default {

    tracking(entries) {

        entries.forEach(entry => {
            // console.log(`${entry.target.id} : ${entry.isIntersecting}`);


            if (entry.target.id === 'overview' && entry.isIntersecting) {
                overviewAnim.play();
            }

            if (entry.target.id === 'hero' && !entry.isIntersecting) {
                heroAnim.reverse();
                firstTime = false;
            }

            if (!firstTime && entry.target.id === 'hero' && entry.isIntersecting) {
                heroAnim.play();
            }

            if (entry.target.id === 'projects' && entry.isIntersecting) {
                projectsAnim.play();
            }

            if (entry.target.id === 'projects' && !entry.isIntersecting) {
            }

            if (entry.target.id === 'overview' && !entry.isIntersecting) {
                overviewAnim.reverse();
            }
        })
    }

}