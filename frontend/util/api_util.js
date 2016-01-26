var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  logUserIn: function (user) {
    $.ajax({
      type: "POST",
      url: "api/session",
      data: {user: user},
      dataType: "json",
      success: function (data) {
        ApiActions.logInUser(data);
        console.log(success);
      },
      error: function (data) {
        console.log('fetch error');
      }

    });
  }
};

module.exports = ApiUtil;
