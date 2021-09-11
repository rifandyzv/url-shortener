function showShortURL() {
  var container = document.getElementsByClassName('container')
  container = container[0]
  try {
    if (container.style.display != 'block') {
      container.style.display = 'block'
    }
  } catch (err) {
    console.log(err)
  }
}

function copy(text) {
  navigator.clipboard.writeText(text)
}

function getLink(link) {
  document.getElementsById('short-link').innerHTML = link
}

document.getElementById('submit-link').addEventListener('click', () => {
  const input = document.querySelector('input.w-50')
  let url = input.value
  fetch('/shortURL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      longURL: url
    })
  })
    .then((response) => response.json())
    .then((data) => {
      const domain = window.location.origin
      let shortURL = domain + '/' + data.short

      const shortView = document.getElementById('short-link')

      shortView.innerHTML = shortURL

      showShortURL()
    })
})
