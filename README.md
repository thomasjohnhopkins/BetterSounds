# BetterSounds

BetterSounds (http://www.better-sounds.com) is an app that allows you to
organize all of your favorite tracks in one place. You can upload your own music,
and discover artists with similar tastes.  This web application is inspired by
SoundCloud and built using Ruby on Rails and React.js.

## Features

BetterSounds allows users to:

- Create an account with secure authentication.  You may also log in using facebook.
- Stream music through an audio player that persists as you navigate the site.
- Upload your own audio files.
- Comment on the audio tracks of others.
- Like and follow audio tracks.
- View the play count, likes, and follows of uploaded tracks.
- Users are given a library which fills with tracks they've either uploaded or
followed. That library


## Exploring the site

Click around to experience the sites various functionality:

- from the welcome page you can discover tracks. Clicking them will bring up
the music player. If you start playing a track before you log in, don't worry
about it, the player persists throughout the site, including the sign in/sign
up process.
- Upon entry to the site, you are shown your profile info in addition to a
collection of six tracks. These tracks are randomly generated by the system.
They might be your tracks, they might be something you haven't seen in a while,
or something totally new.
- Clicking the username in the site header produces a dropdown that allows
you to add tracks, view or edit your profile, and sign out.
- Play buttons exist on each item of the track index. They will load in the
audio and play upon being clicked.
- Clicking on the track name in the index brings you to the track show page.
You can also play a track from it's show page.
- On the track page, comments can be posted and a track can be liked or followed.
- Likes a measure of measure of popularity of a track, in addition to the play
count. Both are displayed in the track show page.
- Clicking on the artist name in the index or on a track show page will
bring you to a user show page.
- User show page displays the selected user's information, as well as the User
library. The User Library is a collection of tracks either uploaded or followed
by that user.
- While likes are simply a measure of popularity, follows have consequence. Any
track that is followed will show up in that user's library.
- A user's library can be accessed when they visit their profile.

## Languages
- Javascript
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
