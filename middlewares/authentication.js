const jwt = require('jsonwebtoken')
const { Owner, Warung } = require('../models')
const private_key = process.env.PRIVATEKEY

module.exports = {
  authentication: (req, res, next) => {
    try {
      const token = req.headers.access_token
      let decoded = jwt.verify(token, private_key)
      console.log(decoded, 'ini decoded')
      Owner.findOne({
        where: {
          id: decoded.payload.id
        },
        include: Warung
      }).then(data => {
        if (data) {
          req.warung_name = data.Warung.name
          req.WarungId = decoded.payload.WarungId
          req.OwnerId = data.id
          next()
        } else {
          next({
            status: 403,
            msg: 'You Must Login First'
          })
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
