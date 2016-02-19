var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../../util/modal_util');
var CurrentUserStore = require('../../stores/currentUser');
var ModalUtil = require('../../util/modal_util');
var TagStore = require('../../stores/tag');


var EditTrackForm = React.createClass({
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
    var tag_ids = [];
    this.props.track.tags.forEach( function (tag) {
      tag_ids.push(tag.id);
    });

    return ({title: this.props.track.title,
      artist: this.props.track.artist,
      taggings: this.props.track.taggings,
      tags: this.props.track.tags,
      allTags: "",
      tag_ids: tag_ids,
      imageFile: null,
      imageUrl: ""
    });
  },

  closeForm: function (e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();
  },

  changeImageFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    if (file) {
      reader.onloadend = function () {
        this.setState({imageFile: file, imageUrl: reader.result});
      }.bind(this);
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  editTrack: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    for (var i = 0; i < this.state.tag_ids.length; i++) {
      formData.append("track[tag_ids][]", this.state.tag_ids[i]);
    }

    formData.append("track[title]", this.state.title);
    formData.append("track[artist]", this.state.artist);
    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }

    // Audio?

    // if (imageFile === "") {
    //   formData.append("user[image]", this.props.user.imageFile)
    // } else {
    //   formData.append("user[image]", this.state.imageFile);
    // }

    var trackId = this.props.track.id;

    ApiUtil.editTrackInfo(formData, trackId);
  },

  handleTagClick: function (e) {
    var newTags = this.state.tag_ids;
    for (var i = 0; i < newTags.length; i++) {
      if (newTags[i] === parseInt(e.target.id)) {
      newTags.splice(i, 1);
      this.setState({ tag_ids: newTags });
      return;
      }
    }
    newTags.push(parseInt(e.target.id));
    this.setState({ tag_ids: newTags });
  },


  render: function () {
    var tagCheckboxes = [];
    var valueLink = this.state.tag_ids;

    if (this.state.allTags !== "") {
      for (var i = 0; i < this.state.allTags.length; i++) {
        var currentId = this.state.allTags[i].id.toString();
        var currentChecked = "";
        if (this.state.tag_ids.indexOf(this.state.allTags[i].id) !== -1) {
          currentChecked = "checked";
        }
         tagCheckboxes.push(
           <li key={i} className="checkboxes group">
             <input type="checkbox"
               className="checkbox-input"
               name="track[tag_id][]"
               id={currentId}
               onChange={this.handleTagClick}
               checked={currentChecked} />
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
      <p className="sign-form">Update your track below</p>
        <form className="form-session group" onSubmit={this.editTrack}>
          <label>Change the song title</label>
          <input type="text"
            valueLink={this.linkState("title")} />

          <label>Update the artist's name</label>
          <input type="text"
            valueLink={this.linkState("artist")} />

          <label>Change track image</label>
          <div className="file-upload">
            <input id="file-upload"
              type="file"
              onChange={this.changeImageFile} /></div>

          <ul className="form-checkboxes">{tagCheckboxes}</ul>

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
