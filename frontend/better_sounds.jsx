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
var UserShow = require('./components/userShow');
var CurrentUserStore = require('./stores/currentUser');
var SessionsApiUtil = require('./util/sessions_api_util');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));
  
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} onEnter={_ensureLoggedIn}>
    <IndexRoute component={Home} onEnter={_ensureLoggedIn}/>
      <Route path="/welcome" component={Entry} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
  </Route>
);

// make `_ensureLoggedIn` the `onEnter` prop of
// routes that requires User Auth (see line 17)
_ensureLoggedIn = function (nextState, replace, callback) {
  // the third `callback` arg allows us to do async
  // operations before the route runs. Router will wait
  // for us to call it before actually routing

  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn(); // this function below
  } else {
    // currentUser has not been fetched
    // lets fetch them and then see if
    // we have to redirect or not
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/welcome");
      callback();
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
