module.exports = {
  raise(code = 500, message = "Internal Server Error!") {
    var error = new Error(message);
    error.code = code;
    error.msg = message;
    throw error;
  },
};
