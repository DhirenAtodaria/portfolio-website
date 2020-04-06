var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (isIE11) {
    var elem = document.querySelector('#ierrorinclusion');
    elem.style.display = 'block';
}

var parallaxah = document.getElementById('parallaxah');
var parallaxInstance = new Parallax(parallaxah);

window.onscroll = function() {myFunction()};

const cursor = cursorDot({
    diameter: 30,
    borderWidth: 1,
    easing: 4,
    zIndex: 10000
});

cursor.over(".mouse", {
    scale: 1.5,
    background: '#fff'
});

cursor.over(".links", {
    scale: 0.5,
    background: 'purple'
})






function myFunction() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

const instance = new TypeIt('.replaceStrings', {
    speed: 100,
    waitUntilVisible: true
  })
//   .type('My name is <b style="color:red;">Dhiren Atodaria</b>.')
  .pause(7000)
//   .delete(27)
//   .type('and I am a Web Developer.')
//   .pause(1000)
//   .delete(30)
  .type('<b style="color:red;">Scroll</b> down to see what I\'ve done...')
  .pause(750)
  .go();

const gooeyfade = new TimelineLite({delay : 2});

gooeyfade.add(
    TweenLite.to('.gooey', 1, {opacity: 0})
);

const loadinganim = new TimelineLite({delay : 3.5});
loadinganim.add(
    TweenLite.to('#loadinganim1', 0.5, { scaleY: 0.01 })
);

loadinganim.add(
    TweenLite.to('#loadinganim1', 1, { x: "-100%", delay: 0.3 })
);

const textrise = new TimelineLite({delay: 5.5});

textrise.add(
    TweenLite.to('.borderbot', 1, {opacity: 1})
)

textrise.add(
    TweenLite.to('.firsttexts1', 0.5, {y: "0", ease: Power4.easeInOut})
)

textrise.add(
    TweenLite.to('.firsttexts2', 0.5, {y: "0", ease: Power4.easeInOut})
)

textrise.add(
    TweenLite.to('.scrollmes', 2, {opacity: 1})
)

const tween = new TimelineLite();

tween.add(
    TweenLite.to('#anim1, #anim1forbg', 20, {opacity: 0
    })
);


const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement:'.one',
    duration: '100%',
    triggerHook: 0
})

.setPin('.one')
.setTween(tween)
.addTo(controller);

const tween2 = new TimelineLite();

tween2.add(
    TweenLite.to('#bg, #reveal1', 1, {opacity: 1
    })
);

tween2.add(
    TweenLite.to('#bg, #reveal1', 1, {opacity: 0})
);

const scene1 = new ScrollMagic.Scene({
    triggerElement:'.two',
    duration: 1750,
    triggerHook: 0
})
.setPin('.two')
.setTween(tween2)
.addTo(controller);

const tween3 = new TimelineLite()
//Leaving Page 1
tween3.delay(1)
.to("#slideContainer", 3, {opacity: 1})
.add("labelrm1")
.to(".anaglyph", 1, {className: "-=texteffect"}, "labelrm1")
.to("#slideContainer", 1, {z: -150}, "labelrm1")

//Switching to Page 2
.to("#slideContainer", 1,   {x: "-12.5%"})
.add("label")
.to(".anaglyph2", 1, {className: "texteffect"}, "label")
.to("#slideContainer", 1, {z: 0}, "label")

//Leaving Page 2 Transition to Page 3
.add("labelrm2")
.to(".anaglyph2", 1, {className: "-=texteffect", delay: 1}, "labelrm2")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm2")
.to("#slideContainer", 1,   {x: "-25%"})
.add("label2")
.to(".anaglyph3", 1, {className: "texteffect"}, "label2")
.to("#slideContainer", 1, {z: 0}, "label2")

//Leaving Page 3 Transition to Page 4
.add("labelrm3")
.to(".anaglyph3", 1, {className: "-=texteffect", delay: 1}, "labelrm3")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm3")
.to("#slideContainer", 1,   {x: "-37.5%"})
.add("label3")
.to(".anaglyph4", 1, {className: "texteffect"}, "label3")
.to("#slideContainer", 1, {z: 0}, "label3")

//Leaving Page 4 Transition to Page 5
.add("labelrm4")
.to(".anaglyph4", 1, {className: "-=texteffect", delay: 1}, "labelrm4")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm4")
.to("#slideContainer", 1,   {x: "-50%"})
.add("label4")
.to(".anaglyph5", 1, {className: "texteffect"}, "label4")
.to("#slideContainer", 1, {z: 0}, "label4")

//Leaving Page 5 Transition to Page 6
.add("labelrm5")
.to(".anaglyph5", 1, {className: "-=texteffect", delay: 1}, "labelrm5")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm5")
.to("#slideContainer", 1,   {x: "-62.5%"})
.add("label5")
.to(".anaglyph6", 1, {className: "texteffect"}, "label5")
.to("#slideContainer", 1, {z: 0}, "label5")

//Leaving Page 6 Transition to Page 7
.add("labelrm6")
.to(".anaglyph6", 1, {className: "-=texteffect", delay: 1}, "labelrm6")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm6")
.to("#slideContainer", 1,   {x: "-75%"})
.add("label6")
.to(".anaglyph7", 1, {className: "texteffect"}, "label6")
.to("#slideContainer", 1, {z: 0}, "label6")

//Leaving Page 7 Transition to Page 8
.add("labelrm7")
.to(".anaglyph7", 1, {className: "-=texteffect", delay: 1}, "labelrm7")
.to("#slideContainer", 1, {z: -150, delay: 1}, "labelrm7")
.to("#slideContainer", 1,   {x: "-87.5%"})
.add("label7")
.to(".anaglyph8", 1, {className: "texteffect"}, "label8")
.to("#slideContainer", 1, {z: 0}, "label8")
.to("#slideContainer", 3, {opacity: 0, delay: 1})


const scene2 = new ScrollMagic.Scene({
    triggerElement:'.three',
    duration: '2000%',
    triggerHook: "onLeave"
})

.setPin(".three")
.setTween(tween3)
.addTo(controller);

const tween4 = new TimelineLite();

tween4.add(
    TweenLite.to('#reveal3, #bg2', 30, {opacity: 1
    })
);

tween4.add(
    TweenLite.to('#reveal3, #bg2', 30, {opacity: 0})
);

const scene3 = new ScrollMagic.Scene({
    triggerElement:'.four',
    duration: 1750,
    triggerHook: 0
})

.setPin('.four')
.setTween(tween4)
.addTo(controller);

const tween5 = new TimelineLite();

tween5.add(
    TweenLite.to('#title', 30, {opacity: 1
    })
);

tween5.add(
    TweenLite.to('#headline, #firstpara, #image1, #into, #image2, #mystory', 30, {opacity: 1})
);

const scene4 = new ScrollMagic.Scene({
    triggerElement:'.five',
    duration: '100%',
    triggerHook: 1
})


.setTween(tween5)
.addTo(controller);






