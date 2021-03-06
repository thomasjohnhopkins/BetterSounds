var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../../util/modal_util');
var TagStore = require('../../stores/tag');


var TrackForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  _onChange: function () {
    this.setState({ allTags: TagStore.allTags() });
  },

  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this._onChange);
    ApiUtil.fetchAllTags();
  },

  componentWillUnmount: function () {
    this.tagListener.remove();
  },

 getInitialState: function () {
   return ({title: "", artist: "", allTags: "",
   tag_ids: [], audioFile: null, audioUrl: "",
   imageFile: null, imageUrl: ""});
 },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 changeAudioFile: function(e) {
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

  changeImageFile: function(e) {
     var reader = new FileReader();
     var file = e.currentTarget.files[0];

     reader.onloadend = function () {
       this.setState({imageFile: file, imageUrl: reader.result});
     }.bind(this);

     if (file) {
       reader.readAsDataURL(file);
     } else {
       this.setState({imageFile: null, imageUrl: ""});
     }
   },

  addTrack: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    for (var i = 0; i < this.state.tag_ids.length; i++) {
      formData.append("track[tag_ids][]", this.state.tag_ids[i]);
    }

    formData.append("track[title]", this.state.title);
    formData.append("track[artist]", this.state.artist);
    formData.append("track[user_id]", this.props.user.id);
    formData.append("track[audio]", this.state.audioFile);
    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }
    // formData.append("track[tag_ids][]", tagsArray);

    // not including a callback at the moment
    ApiUtil.addTrack(formData);
  },

  resetForm: function() {
    this.setState({title: "", artist: "", audioFile: null, audioUrl: ""});
  },

  handleTagClick: function (e) {
    var newTags = this.state.tag_ids;
    for (var i = 0; i < newTags.length; i++) {
      if (newTags[i] === e.target.id) {
      newTags.splice(i, 1);
      this.setState({ tag_ids: newTags });
      return;
      }
    }
    newTags.push(e.target.id);
    this.setState({ tag_ids: newTags });
  },

 render: function () {


   var previewImage = "preview-image";

   if (this.state.imageUrl === "") {
     previewImage = "no-preview-image";
   }

   var tagCheckboxes = [];
   var valueLink = this.state.tag_ids;

   if (this.state.allTags !== "") {
     for (var i = 0; i < this.state.allTags.length; i++) {
       var currentId = this.state.allTags[i].id.toString();
        tagCheckboxes.push(
          <li key={i} className="checkboxes group">
            <input type="checkbox"
              className="checkbox-input"
              name="track[tag_id][]"
              id={currentId}
              onChange={this.handleTagClick}
              value={valueLink.value} />
              <label htmlFor={this.state.allTags[i].name}
                className="checkbox-label">
                {this.state.allTags[i].name}
              </label>
          </li>
       );
     }
   }

  return(
    <div>
      <div className="overlay" onClick={this.closeForm}></div>
      <div className="modal">
      <p className="sign-form">Add Track Below</p>
        <form className="form-session group" onSubmit={this.addTrack}>
          <label>Track title</label>
          <input type="text"
            valueLink={this.linkState("title")} />

          <label>Name of the artist or band</label>
          <input type="text"
            valueLink={this.linkState("artist")} />

          <label>Add audio file</label>
          <div className="file-upload"><input id="file-upload"
            className="file-upload"
            type="file"
            onChange={this.changeAudioFile} /></div>

          <label>Upload track image</label>
          <div className="file-upload">
            <input id="file-upload"
              type="file"
              onChange={this.changeImageFile} /></div>


          <img className={previewImage} src={this.state.imageUrl}/>

          <ul className="form-checkboxes">{tagCheckboxes}</ul>

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
