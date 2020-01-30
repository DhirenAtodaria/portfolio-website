window.onscroll = function() {myFunction()};

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
  .type('My name is <b style="color:red;">Dhiren Atodaria</b>.')
  .pause(1000)
  .delete(27)
  .type('and I am a Web Developer.')
  .pause(1000)
  .delete(30)
  .type('Scroll to see what I\'ve done...')
  .pause(750)
  .go();


const tween = new TimelineLite();

tween.add(
    TweenLite.to('#anim1, #vcontainer', 20, {opacity: 0
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

const tween3 = new TimelineLite();

tween3.add(
    TweenLite.to('#reveal2', 1, {opacity: 1})
);

tween3.add(
    TweenLite.to('.point', 1, {opacity: 1})
)

const scene2 = new ScrollMagic.Scene({
    triggerElement:'.three',
    duration: '100%',
    triggerHook: 0.8
})

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






