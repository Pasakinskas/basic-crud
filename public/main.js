let update = document.getElementById('update');
let deleteItem = document.getElementsByClassName('btn-delete');

update.addEventListener('click', () => {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Hobby',
          'quote': " is too fun to be on the list"
        })
      }).then(res => {
        if (res.ok) return res.json()
      }).then(data => {
        console.log(data)
    })
});

for (let item of deleteItem) {
  item.addEventListener('click', () => {
    fetch('quotes', {
      method: 'delete',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({_id: item.id})
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
};
