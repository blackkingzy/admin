exports.create = function (req, res, next) {
    console.log(req.data)
    const params = {
        code: 20000,
        data: {
            result: true
        }
    }
    res.send(params)
}