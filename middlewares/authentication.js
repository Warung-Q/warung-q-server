const jwt = require('jsonwebtoken')
const { Owner, Warung } = require('../models')
const private_key = process.env.PRIVATEKEY

module.exports = {
  authentication: (req, res, next) => {
    try {
      const token = req.headers.access_token
      let decoded = jwt.verify(token, private_key)
      Owner.findOne({
        where: {
          id: decoded.payload.id
        },
        include: Warung
      })
        .then(data => {
          if (data) {
            req.WarungId = data.Warung.id
            req.OwnerId = data.id
            next()
          } else {
            let errorMsg = {
              err: 'Not exist',
              errors: 'User does not exist'
            }
            res.status(404).json(errorMsg)
          }
        })
        .catch(err => {
          next(err)
        })
    } catch (err) {
      next(err)
    }
  }
}
