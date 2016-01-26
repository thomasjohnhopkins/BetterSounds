var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var SignIn = require('./components/signIn');
var SignUp = require('./components/signUp');

var App = React.createClass({
  render: function () {
    return(
      <div>{this.props.children}</div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SignUp}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
