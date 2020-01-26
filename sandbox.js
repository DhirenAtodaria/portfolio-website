const instance = new TypeIt('.replaceStrings', {
    speed: 100,
    waitUntilVisible: true
  })
  .type('My name is Dhiren Atodaria.')
  .pause(1000)
  .delete(27)
  .type('and I am a Front End Developer')
  .pause(1000)
  .delete(30)
  .type('Scroll to see what I\'ve done...')
  .pause(750)
  .go();


const tween = new TimelineLite();

tween.add(
    TweenLite.to('#anim1', 10, {opacity: 0
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
    TweenLite.to('#reveal1', 20, {opacity: 1
    })
);

tween2.add(
    TweenLite.to('#reveal1', 20, {opacity: 0})
);

const scene1 = new ScrollMagic.Scene({
    triggerElement:'.two',
    duration: '100%',
    triggerHook: 0
})
.setPin('.two')
.setTween(tween2)
.addTo(controller);
