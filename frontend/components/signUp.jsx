var React = require('react');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../util/modal_util');

var LogIn = React.createClass({
  mixins: [LinkedStateMixin, History],


 getInitialState: function () {
   return ({username: "", email: "", password: "", description: "", imageFile: null, imageUrl: ""});
 },

 // SignUp: function (e) {
 //   e.preventDefault();
 //
 //   var user = {};
 //
 //   user.username = this.state.username;
 //   user.email = this.state.email;
 //   user.password = this.state.password;
 //   user.description = this.state.description;
 //
 //   ApiUtil.signUserUp(user);
 //
 //   this.history.pushState(null, "/current-user");
 // },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);
    
    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  SignUp: function(e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);
    formData.append("user[description]", this.state.description);
    formData.append("user[image]", this.state.imageFile);

    ApiUtil.signUserUp(formData, this.resetForm);

    this.history.pushState(null, "/current-user");
  },

  resetForm: function() {
    this.setState({username: "", email: "", password: "", description: "", imageFile: null, imageUrl: ""});
  },

 render: function () {
  return(
    <div>
      <div className='overlay' onClick={this.closeForm}></div>
      <div className='modal'>
      <p>A Forum to Discover Artists and Share Your Own Music.</p>
      <p>Discover what BetterSounds Has to Offer by Signing Up Below.</p>
        <form className="form-session group" onSubmit={this.SignUp}>
          <label>Username</label>
          <input type="text"
            valueLink={this.linkState("username")} />

          <label>Email</label>
          <input type="text"
            valueLink={this.linkState("email")} />

          <label>Password</label>
            <input type="password"
              valueLink={this.linkState("password")} />

          <label>Where Are You From</label>
          <input type="text"
            valueLink={this.linkState("description")} />

          <label>Upload Profile Picture</label>
          <input type="file" onChange={this.changeFile} />


          <img className="preview-image" src={this.state.imageUrl}/>

          <ul className="form-buttons group">
            <li><button className="cancel" onClick={this.closeForm}>Cancel</button></li>
            <li><button className="sign-button" type="submit">Sign Up</button></li>
          </ul>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = LogIn;
