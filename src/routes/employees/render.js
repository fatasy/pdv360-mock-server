const withPagination = require("../../utils/with-pagination.js");
const delay = require("../../utils/delay");
module.exports = async function (req, res) {
  if (req.method === "GET" && req.originalUrl.endsWith("/employees")) {
    // await delay(99000);
    return res.jsonp(withPagination(req, res.locals.data))
  } 
  
  res.jsonp(res.locals.data)
}
