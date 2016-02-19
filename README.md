# BetterSounds

BetterSounds ([live](http://www.better-sounds.com)) is an app that allows you to
organize all of your favorite tracks in one place. You can upload your own music,
and discover artists with similar tastes.  This web application is inspired by
SoundCloud and built using Ruby on Rails and React.js.

![alt tag](https://github.com/thomasjohnhopkins/BetterSounds/app/assets/images/screenshot.jpg)

## Features

- Stores hashed passwords using the BCrypt gem to provide secure authentification
- Implements OmniAuth for simple sign in through Facebook and twitter
- Custom audio player built on top of HTML5 audio tag streams persisting sound as you navigate the site
- Upload a profile image and audio files via paperclip
- User interactions include option to like, follow, tag, and comment on all tracks
- Dynamically updating play count, likes, and follows of uploaded tracks
- Users have access to a library that fills with tracks they've either uploaded or
followed


## Exploring the site

Click around to experience the site's various functionality:

- Users who are not logged in will be brought to a welcome page. This page is populated with tracks featured on BetterSounds. Clicking on a track item will bring up the music player. If you start playing a track before you log in, the audio player will persist during the navigation of the site, including the sign in/sign up process.
- Upon entry to the site, the current users collection of tracks are displayed. This collection includes any tracks uploaded or explicitly followed by the user, if any.
- Clicking the username on the right of the site header produces a dropdown that allows you to add tracks, view or edit your profile, as well as sign out.
- Play buttons exist on each item of the track index. They will load the selected track in the audio player and start upon being clicked.
- Clicking on the name of a track item in the index brings you to the track show page. You can also play a track from its show page.
- On the track page, comments can be posted and a track can be liked. 'Likes' simply measure the popularity of a track.
- While likes are simply a measure of popularity, follows have consequence. Tracks can be followed by clicking the appropriate button. Followed audio will then show up in that user's library.
- A current user's library can be accessed by visiting the home page or by navigating to their profile using the site header.
- Clicking on the artist name in the index or on a track show page will
bring you to a user show page.
- User show page displays the selected user's information, as well as the User
library. The User Library is a collection of tracks either uploaded or followed
by that user.


## Languages
- JavaScript
- Ruby
- HTML / CSS

## Frameworks
- React.js
- Rails

## Libraries and Technologies
- jQuery / AJAX
- paperclip / AWS
- figaro
- jbuilder
