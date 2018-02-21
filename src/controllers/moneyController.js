const moneyController = {
    postExpense(req, res) {
        req.app.get('db').moneyTracker.save(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            };
            res.json({
                message: "expense has been saved!",
                data: req.body,
            });
        });
    }
};

module.exports = moneyController;
