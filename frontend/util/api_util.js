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
        console.log('log in success');
      },
      error: function (data) {
        console.log('log in error');
      }

    });
  },

  SignUserUp: function (user) {
    $.ajax({
      type: "POST",
      url: "api/users",
      data: {user: user},
      dataType: "json",
      success: function (data) {
        ApiActions.signUpUser(data);
        console.log('sign up success');
      },
      error: function (data) {
        console.log('sign up error');
      }

    });
  }
};

module.exports = ApiUtil;