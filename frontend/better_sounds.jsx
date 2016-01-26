var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function () {
    return(
      <div>Better Sounds</div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('content'));
});
