module.exports = function getdate() {
  let date = new Date().getFullYear()
  if (new Date().getMonth() < 10) {
    date += `-0${new Date().getMonth() + 1}`
  } else {
    date += `-${new Date().getMonth() + 1}`
  }
  if (new Date().getDay() < 10) {
    date += `-0${new Date().getDate()}`
  } else {
    date += `-${new Date().getDate()}`
  }
  console.log(date)
  return date
}
