function addBtcPriceListener(button) {
  button.addEventListener('click', async () => {
    const currency = document.querySelector('input[name="currency"]:checked').value;
    const link = "https://api.coindesk.com/v1/bpi/currentprice/"+ currency + ".json";
    const blob = await fetch(link, {method: 'get'});
    const res = await blob.json();
    const rate = res.bpi[currency.toUpperCase()].rate;
    
    document.querySelector("#price-box").firstChild.innerText = rate;
  })
}

function addUpdateListener(button) {
  button.addEventListener('click', () => {
    fetch('cookQuote', {
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
          span.innerText = "Hobby";
          const cookBody = span.parentNode.parentNode.firstChild.nextElementSibling.firstChild;
          cookBody.innerText = "is too fun to be on this list";
          break;
        }
      }
    })
  });
}

function addSubmitQuoteListener(button) {
  button.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = {
      name: form.querySelector('[name=name]').value,
      quote: form.querySelector('[name=quote]').value,
    };
    const blob = await fetch('quotes', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(body),
    });
    const res = await blob.json();
    const newQuote = document.createElement('li');

    form.reset();
    newQuote.classList.add('row', 'data-li');
    newQuote.innerHTML = `<div class="col-xs-3 todo todo-name"><span>${res.data.name}</span></div>
    <div class="col-xs-6 todo todo-body"><span>${res.data.quote}</span></div>
    <div class="col-xs-3 todo"><button class="btn btn-delete" data-id="${res.data._id}">Solve!</button></div>`;

    document.querySelector('#quotesList').appendChild(newQuote);
    addDeleteListener(newQuote.querySelector('button'));
  });
}

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

function addDeleteListener(button) {
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

function initWebsockets () {
  const socket = new WebSocket('ws://localhost:3001');
  socket.onopen = () => console.log('ws connected');

  const form = document.getElementById('chat-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = form.querySelector('[name=message]').value;
    socket.send(text);
  });

  socket.onmessage = message => {
    document.querySelector('.messages').innerHTML += `<li>${message.data}</li>`;
  }
}

function init() {
  const updateButton = document.getElementById('update');
  const deleteItemButton = document.getElementsByClassName('btn-delete');
  const textAreas = document.getElementsByClassName('my-textbox');
  const btcPriceButton = document.getElementById("btn-btc-price");
  const submitQuotesButton = document.querySelector('#save-quote');
  
  addSubmitQuoteListener(submitQuotesButton);
  addUpdateListener(updateButton);
  addBtcPriceListener(btcPriceButton);
  
  for (const item of deleteItemButton) {
    addDeleteListener(item);
  };
  
  for (const item of textAreas) {
    addUppercaseListener(item);
  };

  initWebsockets();
}

init();
