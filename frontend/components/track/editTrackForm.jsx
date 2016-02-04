var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../../util/modal_util');
var CurrentUserStore = require('../../stores/currentUser');
var ModalUtil = require('../../util/modal_util');


var EditTrackForm = React.createClass({
  mixins: [LinkedStateMixin, History],


  getInitialState: function () {
   return ({title: this.props.track.title,
     artist: this.props.track.artist,
     play_count: this.props.track.play_count,
   });
  },

  closeForm: function (e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();
  },

  // changeFile: function(e) {
  //   var reader = new FileReader();
  //   var file = e.currentTarget.files[0];
  //   if (file) {
  //     reader.onloadend = function () {
  //       this.setState({imageFile: file, imageUrl: reader.result});
  //     }.bind(this);
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.setState({imageFile: null, imageUrl: ""});
  //   }
  // },

  editProfile: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[artist]", this.state.artist);
    formData.append("track[play_count]", this.state.play_count);

    // Audio?

    // if (imageFile === "") {
    //   formData.append("user[image]", this.props.user.imageFile)
    // } else {
    //   formData.append("user[image]", this.state.imageFile);
    // }

    var trackId = this.props.track.id;

    ApiUtil.editTrackInfo(formData, trackId);

    this.resetForm();
  },

  resetForm: function() {
    this.setState({title: "", artist: "", play_count: ""});
  },

  render: function () {
  return(
    <div>
      <div className="overlay" onClick={this.closeForm}></div>
      <div className="modal">
      <p className="sign-form">Update your track below</p>
        <form className="form-session group" onSubmit={this.editProfile}>
          <label>Change the song title</label>
          <input type="text"
            valueLink={this.linkState("title")} />

          <label>Update the artist's name</label>
          <input type="text"
            valueLink={this.linkState("artist")} />

          <ul className="form-buttons group">
            <li className="form-li">
              <button className="cancel" onClick={this.closeForm}>
                Cancel
              </button>
            </li>
            <li className="form-li">
              <button className="sign-button" type="submit">
                Update track
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = EditTrackForm;
