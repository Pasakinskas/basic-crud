function addFinanceListener(btn) { //naming
    btn.addEventListener('submit', async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const body = {
            name: form.querySelector("[name=expense-name]").value,
            amount: form.querySelector("[name=amount]").value,
            comment: form.querySelector("[name=comment]").value,
            category: form.querySelector("[name=category]").value,
            date: form.querySelector("[name=date]").value,
        };
        const blob = await fetch("money", {method: "post",
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({body}),
        });
        const res = await blob.json();
        form.reset();
        // addToList(res);
    });
}

function addToList(item) {
    //this will add the newly entered finance log to the list.
    console.log(item);
    // return;
}

function init() {
    const financeForm = document.getElementById("save-expense");
    addFinanceListener(financeForm);
}

init();
