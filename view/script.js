const api = require('../server')

function showShortURL() {
  var container = document.getElementsByClassName('container')
  container = container[0]
  try {
    if (container.style.display != 'block') {
      container.style.display = 'block'
    } else {
      container.style.display = 'none'
    }
  } catch (err) {
    console.log(err)
  }
}
