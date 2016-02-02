var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var SignIn = require('./components/signIn');
var SignUp = require('./components/signUp');
var Welcome = require('./components/welcome');
var Entry = require('./components/entry');
var Home = require('./components/home');
var UserShow = require('./components/user/userShow');
var CurrentUserStore = require('./stores/currentUser');
var SessionsApiUtil = require('./util/sessions_api_util');
var App = require('./components/app');
var TrackShow = require('./components/track/trackShow');
var UserPage = require('./components/user/userPage');


function _ensureLoggedIn(nextState, replace, callback) {
  // the third `callback` arg allows us to do async
  // operations before the route runs. Router will wait
  // for us to call it before actually routing
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {

    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/welcome");
    }
    callback();
  }
}

var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} onEnter={_ensureLoggedIn} />
      <Route path="welcome" component={Entry} />
      <Route path="sign-up" component={SignUp} />
      <Route path="sign-in" component={SignIn} />
      <Route path="track/:trackId" component={TrackShow}/>
      <Route path="user/:userId" component={UserPage} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
