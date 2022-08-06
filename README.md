# About

![music-stats-app preview](https://i.ibb.co/bmt6scM/Screenshot-2022-08-05-at-23-43-39-Music-Stats.png)

This is a music app created as an assignment for SoftUni's React course.

I used the following:

- React, Back4App, Parse SDK, Context API
- I haven't used CSS libraries, only `react-select` is used for dropdowns.

# Features

- Uses the last.fm API to retrieve popular albums.
- Filter the albums by tag and search by album/artist name.
- Browse with pagination.
- View details about the albums/artists.
- Register, login, logout, password reset.
- Albums dropdown:
   - **User Albums:** Anyone can view albums from other users.
   - **Add Album:** Logged in users can submit albums and view them as well as edit/delete. You can like albums added by others.
- **Edit your profile** with live preview.

# Setup

> *The examiner is provided with the .env variables without which the app won't work.*

* Clone the repository.
* Initialise with `npm i` to install dependencies.
* You will need to create an `.env` file in the app root and add the values you have been provided with.
* Run with `npm start`.
