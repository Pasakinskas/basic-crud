const updateButton = document.getElementById('update');
const deleteItemButton = document.getElementsByClassName('btn-delete');
const textAreas = document.getElementsByClassName('my-textbox');

function addUpdateListener(button) {
  button.addEventListener('click', () => {
    fetch('quotes', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: 'Hobby',
        quote: ' is too fun to be on the list',
      }),
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      const spanList = document.querySelectorAll('li.data-li span');
      for (const span of spanList) {
        if (span.innerText === "cook") {
          span.innerText = "Hobby"; // cant find classes todo-name/body if I parentnode.parentnode
          const cookBody = span.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild;
          cookBody.innerText = "is too fun to be on this list";
          break;
        }
      }
    })
  });
}

addUpdateListener(updateButton);

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
  const res = await blob.json(); //Get blob, send back blob.json? What?
  const newQuote = document.createElement('li');
  newQuote.classList.add('row', 'data-li');
  newQuote.innerHTML = `<div class="col-xs-3"><span>${res.data.name}</span></div>
  <div class="col-xs-6"><span>${res.data.quote}</span></div>
  <div class="col-xs-3"><button class="btn btn-delete" data-id="${res.data._id}">Solve!</button></div>`;
  document.querySelector('#quotesList').appendChild(newQuote);
  addDeleteListener(newQuote.querySelector('button'));
});

function addUppercaseListener(textbox) {
  textbox.addEventListener('keypress', (event) => {
    if(!event.key.match(/[0-9-a-z-\s-!?,]/)) {
      event.preventDefault();
      textbox.classList.add('warning');
      textbox.parentNode.querySelector('#explain-form-error').classList.remove('on-demand');
    }
    window.setTimeout(() => {
      textbox.classList.remove('warning');
      textbox.parentNode.querySelector('#explain-form-error').classList.add('on-demand');
    }, 2500);
  });
}

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

for (const item of textAreas) {
  addUppercaseListener(item);
};