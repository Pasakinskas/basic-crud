let update = document.getElementById('update');
let delOne = document.getElementById('delete');

update.addEventListener('click', () => {
    fetch('crud-example', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Updating',
          'quote': 'Is a very important procedure to learn'
        })
      }).then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
    }).then(data => {
        console.log(data)
        window.location.reload(true)
      })
});