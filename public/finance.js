const financeForm = document.getElementById("save-expense");

function addFinanceListener(btn) {
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
        console.log(res);
        form.reset();
    });
}

addFinanceListener(financeForm);
