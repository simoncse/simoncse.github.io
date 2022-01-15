import { gsap } from "gsap";



const SCALE = 3.5;
const SCALE_LARGE = 7.5;

// let mouse = { x: 0, y: 0 };


export default class Cursor {
    constructor(selector) {
        this.hoverItems = {
            normal: [],
            large: []
        }

        this.Cursor = document.querySelector(selector);
        this.Cursor.classList.add('cross');



        document.addEventListener("mouseleave", this.removeCursor)
        document.addEventListener("mouseenter", this.showCursor)

        window.addEventListener("mousemove", this.handleMouseMove);

        this.growAnimationNormal = this.defaultAnimation(SCALE);
        this.growAnimationLarge = this.defaultAnimation(SCALE_LARGE);
    }

    //Public Methods
    setHoverSelectors = (sels, type = "normal") => {
        const total = []
        sels.forEach(sel => {
            const items = document.querySelectorAll(sel);
            total.push(...items);
        });

        if (type === "normal") {
            this.hoverItems.normal = total
            return
        }
        if (type === "large") {
            this.hoverItems.large = total
            return
        }
    }

    runInteractive = () => {
        this.hoverItems.normal.forEach(item => {
            item.addEventListener("mouseleave", () => {

                this.growAnimationNormal.reverse();
            })
            item.addEventListener("mouseenter", () => {
                if (this.growAnimationLarge.reversed()) {
                    this.growAnimationLarge.pause(0);
                };
                this.growAnimationNormal.play();

            })
        })

        this.hoverItems.large.forEach(item => {
            item.addEventListener("mouseleave", () => {
                this.growAnimationLarge.reverse();
            })
            item.addEventListener("mouseenter", () => {
                if (this.growAnimationNormal.reversed()) {
                    this.growAnimationNormal.pause(0);
                };
                this.growAnimationLarge.play();
            })
        })
    }


    // Private Methods
    handleMouseMove = (e) => {
        gsap.to(this.Cursor, {
            x: e.clientX,
            y: e.clientY,
            ease: "power4.out"
        })
    }

    removeCursor = () => {
        gsap.to(this.Cursor, {
            duration: 0.3,
            opacity: 0,
            rotation: 100
        })
    }

    showCursor = (e) => {
        gsap.set(this.Cursor, {
            x: e.clientX - 20,
            y: e.clientY - 20,
        })
        gsap.to(this.Cursor, {
            duration: 0.5,
            opacity: 1,
            rotation: 45
        })
    }

    defaultAnimation = (scaleVal) => {
        const tl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.85,
                ease: "power1.inOut"
            },
            onStart: () => {
                this.Cursor.classList.remove('cross');
            },
            onReverseComplete: () => {
                this.Cursor.classList.add('cross');
            }
        });

        tl.to(this.Cursor, {
            scale: scaleVal,
            rotation: -280,
            borderRadius: '100%',
        })

        return tl
    }
}
