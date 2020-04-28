const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {
    const elem = document.querySelector("#ierrorinclusion");
    elem.style.display = "block";
}

window.mobileCheck = () => {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
console.log(isSafari);

if (!window.mobileCheck() || !isSafari) {
    let canvas = document.querySelector("canvas");
    let c = canvas.getContext("2d", { alpha: false });

    canvas.width = window.innerWidth * 1.1;
    canvas.height = window.innerHeight * 1.1;

    let particleCount;
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        particleCount = 100;
    } else {
        particleCount = 250;
    }

    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };

    window.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX - canvas.width / 2;
        mouse.y = event.clientY - canvas.height / 2;
    });

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        lightParticles = [];
        initializeParticles();
    });

    function LightParticle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.update = function () {
            this.draw();
        };

        this.draw = function () {
            c.save();
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.shadowColor = this.color;
            c.shadowBlur = 15;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
            c.restore();
        };
    }

    let lightParticles = [];

    let timer = 0;
    let opacity = 1;
    let speed = 0.0001;
    let colors = ["#F6F8FF", "#23CE6B", "#00003D", "#A846A0", "#50514F"];

    let initializeParticles;

    (initializeParticles = () => {
        for (let i = 0; i < particleCount; i++) {
            let randomColorIndex = Math.floor(Math.random() * 6);
            let randomRadius = Math.random() * 4;

            // Ensure particles are spawned past screen width and height so
            // there will be no missing stars when rotating canvas
            let x =
                Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2;
            let y =
                Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2;
            lightParticles.push(
                new LightParticle(x, y, randomRadius, colors[randomColorIndex])
            );
        }
    })();

    animate = () => {
        window.requestAnimationFrame(animate);

        c.save();
        if (isMouseDown === true) {
            // Ease into the new opacity
            let desiredOpacity = 0.01;
            opacity += (desiredOpacity - opacity) * 0.03;
            c.fillStyle = "rgba(0, 0, 0," + opacity + ")";

            // Ease into the new speed
            let desiredSpeed = 0.012;
            speed += (desiredSpeed - speed) * 0.01;
            timer += speed;
        } else {
            // Ease back to the original opacity
            let originalOpacity = 1;
            opacity += (originalOpacity - opacity) * 0.01;
            c.fillStyle = "rgba(0, 0, 0, " + opacity + ")";

            // Ease back to the original speed
            let originalSpeed = 0.001;
            speed += (originalSpeed - speed) * 0.01;
            timer += speed;
        }

        c.fillRect(0, 0, canvas.width, canvas.height);
        c.translate(canvas.width / 2, canvas.height / 2);
        c.rotate(timer);

        for (let i = 0; i < lightParticles.length; i++) {
            lightParticles[i].update();
        }

        c.restore();
    };

    let isMouseDown = false;

    window.addEventListener("mousedown", function () {
        isMouseDown = true;
    });

    window.addEventListener("mouseup", function () {
        isMouseDown = false;
    });

    animate();
}

let parallaxah = document.getElementById("parallaxah");
let parallaxInstance = new Parallax(parallaxah);

window.onscroll = function () {
    myFunction();
};

const cursor = cursorDot({
    diameter: 30,
    borderWidth: 1,
    easing: 4,
    zIndex: 10000,
});

cursor.over(".mouse", {
    scale: 1.5,
    background: "#fff",
});

cursor.over(".links", {
    scale: 0.5,
    background: "purple",
});

function myFunction() {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

const instance = new TypeIt(".replaceStrings", {
    speed: 100,
    waitUntilVisible: true,
})
    .pause(7000)
    .type('<b style="color:red;">Scroll</b> down to see what I\'ve done...')
    .pause(750)
    .go();

const gooeyfade = gsap.timeline({ delay: 2 });

gooeyfade.to(".gooey", 1, { opacity: 0 });

const loadinganim = gsap.timeline({ delay: 3.5 });
loadinganim.to("#loadinganim1", 0.5, { scaleY: 0.01 });

loadinganim.to("#loadinganim1", 1, { x: "-100%", rotation: 0.01, delay: 0.3 });

const textrise = gsap.timeline({ delay: 5.5 });

textrise
    .to(".borderbot", 1, { opacity: 1 })
    .to(".firsttexts1", 0.5, {
        y: "0",
        rotation: 0.01,
        ease: Power4.easeInOut,
    })
    .to(".firsttexts2", 0.5, {
        y: "0",
        rotation: 0.01,
        ease: Power4.easeInOut,
    })
    .to(".scrollmes", 2, { opacity: 1 });

const tween = gsap.timeline();

tween.to("#anim1, #anim1forbg", 20, { opacity: 0 });

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".one",
    duration: "100%",
    triggerHook: 0,
})

    .setPin(".one")
    .setTween(tween)
    .addTo(controller);

const tween2 = gsap.timeline();

tween2
    .to("#bg, #reveal1", 1, { opacity: 1 })
    .to("#bg, #reveal1", 1, { opacity: 0 });

const scene1 = new ScrollMagic.Scene({
    triggerElement: ".two",
    duration: 1750,
    triggerHook: 0,
})
    .setPin(".two")
    .setTween(tween2)
    .addTo(controller);

const tween3 = gsap.timeline();
//Leaving Page 1
tween3
    .delay(1)
    .to("#slideContainer", 3, { opacity: 1 })
    .add("labelrm1")
    .to(".anaglyph", 1, { className: "-=texteffect" }, "labelrm1")
    .to("#slideContainer", 1, { z: -150 }, "labelrm1")

    //Switching to Page 2
    .to("#slideContainer", 1, { x: "-12.5%" })
    .add("label")
    .to(".anaglyph2", 1, { className: "texteffect" }, "label")
    .to("#slideContainer", 1, { z: 0 }, "label")

    //Leaving Page 2 Transition to Page 3
    .add("labelrm2")
    .to(".anaglyph2", 1, { className: "-=texteffect", delay: 1 }, "labelrm2")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm2")
    .to("#slideContainer", 1, { x: "-25%" })
    .add("label2")
    .to(".anaglyph3", 1, { className: "texteffect" }, "label2")
    .to("#slideContainer", 1, { z: 0 }, "label2")

    //Leaving Page 3 Transition to Page 4
    .add("labelrm3")
    .to(".anaglyph3", 1, { className: "-=texteffect", delay: 1 }, "labelrm3")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm3")
    .to("#slideContainer", 1, { x: "-37.5%" })
    .add("label3")
    .to(".anaglyph4", 1, { className: "texteffect" }, "label3")
    .to("#slideContainer", 1, { z: 0 }, "label3")

    //Leaving Page 4 Transition to Page 5
    .add("labelrm4")
    .to(".anaglyph4", 1, { className: "-=texteffect", delay: 1 }, "labelrm4")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm4")
    .to("#slideContainer", 1, { x: "-50%" })
    .add("label4")
    .to(".anaglyph5", 1, { className: "texteffect" }, "label4")
    .to("#slideContainer", 1, { z: 0 }, "label4")

    //Leaving Page 5 Transition to Page 6
    .add("labelrm5")
    .to(".anaglyph5", 1, { className: "-=texteffect", delay: 1 }, "labelrm5")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm5")
    .to("#slideContainer", 1, { x: "-62.5%" })
    .add("label5")
    .to(".anaglyph6", 1, { className: "texteffect" }, "label5")
    .to("#slideContainer", 1, { z: 0 }, "label5")

    //Leaving Page 6 Transition to Page 7
    .add("labelrm6")
    .to(".anaglyph6", 1, { className: "-=texteffect", delay: 1 }, "labelrm6")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm6")
    .to("#slideContainer", 1, { x: "-75%" })
    .add("label6")
    .to(".anaglyph7", 1, { className: "texteffect" }, "label6")
    .to("#slideContainer", 1, { z: 0 }, "label6")

    //Leaving Page 7 Transition to Page 8
    .add("labelrm7")
    .to(".anaglyph7", 1, { className: "-=texteffect", delay: 1 }, "labelrm7")
    .to("#slideContainer", 1, { z: -150, delay: 1 }, "labelrm7")
    .to("#slideContainer", 1, { x: "-87.5%" })
    .add("label7")
    .to(".anaglyph8", 1, { className: "texteffect" }, "label8")
    .to("#slideContainer", 1, { z: 0 }, "label8")
    .to("#slideContainer", 3, { opacity: 0, delay: 1 });

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".three",
    duration: "2000%",
    triggerHook: "onLeave",
})
    .setPin(".three")
    .setTween(tween3)
    .addTo(controller);

const tween4 = gsap.timeline();

tween4
    .to("#reveal3, #bg2", 30, { opacity: 1 })
    .to("#reveal3, #bg2", 30, { opacity: 0 });

const scene3 = new ScrollMagic.Scene({
    triggerElement: ".four",
    duration: 1750,
    triggerHook: 0,
})

    .setPin(".four")
    .setTween(tween4)
    .addTo(controller);

const tween5 = gsap.timeline();

tween5
    .to("#title", 30, { opacity: 1 })
    .to("#headline, #firstpara, #image1, #into, #image2, #mystory", 30, {
        opacity: 1,
    });

const scene4 = new ScrollMagic.Scene({
    triggerElement: ".five",
    duration: "100%",
    triggerHook: 1,
})

    .setTween(tween5)
    .addTo(controller);
