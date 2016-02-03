var React = require('react');
var History = require('react-router').History;
var AudioPlayerActions = require('../../actions/audio_player_actions');
var AudioPlayerStore = require('../../stores/player');
var ApiUtil = require('../../util/api_util');
var CurrentUserStore = require('../../stores/currentUser');
var UserFollowStore = require('../../stores/userFollow');
var UserLikeStore = require('../../stores/userLike');


var TrackIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      track: AudioPlayerStore.fetchTrack(),
      isPlaying: AudioPlayerStore.isPlaying(),
      isPaused: AudioPlayerStore.isPaused(),
      isEnded: AudioPlayerStore.isEnded(),
      currentTime: AudioPlayerStore.getCurrentTime(),
      volume: AudioPlayerStore.getVolume(),
      duration: AudioPlayerStore.getDuration(),
      followed: this.userFollowsTrack(),
      liked: this.userLikesTrack()
    };
  },

  componentWillMount: function () {
    ApiUtil.fetchUserFollows();
    ApiUtil.fetchUserLikes();
  },

  componentDidMount: function () {
    this.audioPlayerToken = AudioPlayerStore.addListener(this._onChange);
    this.userFollowListener = UserFollowStore.addListener(this._onChange);
    this.userLikeListener = UserLikeStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.audioPlayerToken.remove();
    this.userFollowListener.remove();
    this.userLikeListener.remove();
  },

  showTrack: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/track/' + this.props.track.id, {});
  },

  showUser: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/user/' + this.props.user.id, {});
  },

  addToPlayerStore: function () {
    if (this.state.track === this.props.track && this.state.isPlaying) {
      AudioPlayerActions.pauseAudio();
    } else if (this.state.track === this.props.track ) {
      AudioPlayerActions.playAudio();
    } else {
      AudioPlayerActions.setTrack(this.props.track);
    }
  },

  userFollowsTrack: function () {
    var user = CurrentUserStore.currentUser();
    var userFollows = UserFollowStore.allUserFollows();

    for (var i = 0; i < userFollows.length; i++) {
      if (userFollows[i].track_id === this.props.track.id && userFollows[i].user_id === user.id) {
        return userFollows[i];
      }
    }
    return false;
  },

  userLikesTrack: function () {
    var user = CurrentUserStore.currentUser();
    var userLikes = UserLikeStore.allUserLikes();

    for (var i = 0; i < userLikes.length; i++) {
      if (userLikes[i].track_id === this.props.track.id && userLikes[i].user_id === user.id) {
        return userLikes[i];
      }
    }
    return false;
  },

  toggleFollowTrack: function () {
    var user_id = CurrentUserStore.currentUser().id;
    var track_id = this.props.track.id;

    if (this.userFollowsTrack()) {
      ApiUtil.unfollowTrack(this.userFollowsTrack().id);
    } else {
      var formData = new FormData();

      formData.append("user_follow[track_id]", track_id);
      formData.append("user_follow[user_id]", user_id);

      ApiUtil.followTrack(formData);
    }
  },

  toggleLikeTrack: function () {
    var user_id = CurrentUserStore.currentUser().id;
    var track_id = this.props.track.id;

    if (this.userLikesTrack()) {
      ApiUtil.unlikeTrack(this.userLikesTrack().id);
    } else {
      var formData = new FormData();

      formData.append("user_like[track_id]", track_id);
      formData.append("user_like[user_id]", user_id);

      ApiUtil.likeTrack(formData);
    }
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {

    var icon;

    if (this.state.track === this.props.track && this.state.isPlaying) {
      icon = <i className="fa fa-pause-circle fa-4x"></i>;
    } else {
      icon = <i className="fa fa-play-circle fa-4x"></i>;
    }

    var followIconClass;
    if (this.userFollowsTrack()) {
      followIconClass = "fa fa-retweet followed";
    } else {
      followIconClass = "fa fa-retweet";
    }

    var likeIconClass;
    if (this.userLikesTrack()) {
      likeIconClass = "fa fa-heart liked";
    } else {
      likeIconClass = "fa fa-heart";
    }

    return (
      <div className="group">
        <button className="track-index-item-button"
          onClick={this.addToPlayerStore}>
            {icon}
        </button>
        <ul className="track-index-item-details">
          <li className="track-index-item-artist"
            onClick={this.showUser}>
              {this.props.track.artist}
          </li>
          <li className="track-index-item-title" onClick={this.showTrack}>
            {this.props.track.title}
          </li>
          <li>
            <div className="follow-track-icon" onClick={this.toggleFollowTrack}>
              <i className={followIconClass}></i>
            </div>
            <div className="follow-track-icon" onClick={this.toggleLikeTrack}>
              <i className={likeIconClass}></i>
            </div>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = TrackIndexItem;
