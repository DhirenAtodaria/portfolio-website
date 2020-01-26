const instance = new TypeIt('#replaceStrings', {
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