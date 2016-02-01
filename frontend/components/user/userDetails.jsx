var React = require('react');
var UserStore = require('../../stores/currentUser');

var UserDetails = React.createClass({
  render: function () {

    return (
      <div className="user-details">
        <p className="user-details-item">
          <a href="#">{this.props.user.website}</a>
        </p>
        <p className="user-details-item">
          {this.props.user.bio}
        </p>
      </div>
    );
  }
});

module.exports = UserDetails;
