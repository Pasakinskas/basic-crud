let updateButton = document.getElementById('update');
let deleteItemButton = document.getElementsByClassName('btn-delete');

updateButton.addEventListener('click', () => {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: 'Hobby',
          quote: ' is too fun to be on the list',
        })
      }).then(res => {
        if (res.ok) return res.json()
      }).then(data => {
        console.log(data)
        window.location.reload(true)
    })
});

document.querySelector('#saveQuote').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget; // == document.querySelector('#saveQuote') ?
  const body = {
    name: form.querySelector('[name=name]').value,
    quote: form.querySelector('[name=quote]').value,
  };
  const blob = await fetch('quotes', { // by my logic, i put it in /quotes, but take it out of /quotes:id
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(body),
  });
  form.reset(); // Deletes the text, that I've written into my form element
  const res = await blob.json(); //Get blob, send back blob? What?
  const newQuote = document.createElement('li');
  newQuote.classList.add('row', 'data-li');
  newQuote.innerHTML = `<div class="col-xs-3"><span>${res.data.name}</span></div>
  <div class="col-xs-6"><span>${res.data.quote}</span></div>
  <div class="col-xs-3"><button class="btn btn-delete" data-id="${res.data._id}">Solve!</button></div>`;
  document.querySelector('#quotesList').appendChild(newQuote);
  addDeleteListener(newQuote.querySelector('button'));
});

function addDeleteListener (button) {
  button.addEventListener('click', () => {
    fetch(`quotes/${button.getAttribute('data-id')}`, {
      method: 'delete',
      headers: new Headers({'Content-Type': 'application/json'}),
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      console.log(data)
      button.parentNode.parentNode.remove();
    })
  })
};

for (const item of deleteItemButton) {
  addDeleteListener(item);
};
