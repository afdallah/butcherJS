// Revealing module pattern
var Butcher = (function () {
  /*
   * Private method
   */
  const wrapContext = function (contexts, parent, className) {
    contexts.forEach((ctx, index) => {
      if (ctx !== ' ') {
        const el = document.createElement('span')
        el.classList.add(className)
        el.style.display = 'inline-block'
        el.style.position = 'relative'

        el.textContent = ctx
        parent.appendChild(el)
      }

      // it would be better if classname is part of public api
      // Looking for a way to refactor this
      if ((className === 'char' && ctx === ' ') || (className === 'word')) {
        parent.appendChild(document.createTextNode(' '))
      }
    })
  }

  /**
   * Public method
   */
  const words = function (param) {
    let elements

    if (typeof param === 'string') {
      elements = document.querySelectorAll(param)
    } else if (param instanceof Element) {
      elements = param
    }


    elements.forEach(el => {
      let words = el.textContent.split(' ')

      el.classList.add('words')
      el.textContent = ''

      wrapContext(words, el, 'word')
    })
  }

  const chars = function (param) {
    let elements

    if (typeof param === 'string') {
      elements = document.querySelectorAll(param)
    } else if (param instanceof Element) {
      elements = param
    }

    elements.forEach(el => {

      let words = el.textContent.split('')
      el.classList.add('chars')
      el.textContent = ''

      wrapContext(words, el, 'char')
    })
  }

  return {
    words: words,
    chars: chars
  }
})()