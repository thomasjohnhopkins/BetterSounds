var React = require('react');
var UserStore = require('../../stores/currentUser');

var UserDetails = React.createClass({
  render: function () {
    var link = "http://" + this.props.user.website;
    return (
      <div className="user-details">
        <p className="user-details-item">
          <a className="website"
            href={link}>
              {this.props.user.website}
          </a>
        </p>
        <p className="user-details-item">
          {this.props.user.bio}
        </p>
      </div>
    );
  }
});

module.exports = UserDetails;
