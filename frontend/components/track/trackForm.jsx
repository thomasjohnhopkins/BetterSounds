var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../../util/modal_util');


var TrackForm = React.createClass({
  mixins: [LinkedStateMixin, History],


 getInitialState: function () {
   return ({title: "", artist: "", audioFile: null, audioUrl: ""});
 },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({audioFile: file, audioUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({audioFile: null, audioUrl: ""});
    }
  },

  addTrack: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[artist]", this.state.artist);
    formData.append("track[user_id]", this.props.user.id);
    formData.append("track[audio]", this.state.audioFile);

    // not including a callback at the moment
    ApiUtil.addTrack(formData);

    this.history.pushState(null, "/");
  },

  resetForm: function() {
    this.setState({title: "", artist: "", audioFile: null, audioUrl: ""});
  },

 render: function () {
  return(
    <div>
      <div className='overlay' onClick={this.closeForm}></div>
      <div className='modal'>
      <p>Add Track Below</p>
        <form className="form-session group" onSubmit={this.addTrack}>
          <label>Track title</label>
          <input type="text"
            valueLink={this.linkState("title")} />

          <label>Name of the artist or band</label>
          <input type="text"
            valueLink={this.linkState("artist")} />

          <label>Add audio file</label>
          <input id="file-upload" type="file" onChange={this.changeFile} />

          <ul className="form-buttons group">
            <li className="form-li">
              <button className="cancel" onClick={this.closeForm}>
                Cancel
              </button>
            </li>
            <li className="form-li">
              <button className="sign-button" type="submit">
                Upload Track
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = TrackForm;
