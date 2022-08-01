# About

![app preview](https://i.ibb.co/7vnwjNR/Screenshot-2022-07-28-at-17-44-21-Music-Stats.png)

This is a music app created as an assignment for SoftUni's React course.

I used Back4App for the Backend and Parse SDK to retrieve and modify data. I opted out for writing the CSS by myself. React-select is used for dropdowns.

# Features

<b>Anything marked with * is still being worked on.</b>

- Uses the last.fm API to retrieve popular albums.
- Search/filter albums by tag.
- Create an account (option to request password reset).
- Submit albums and <b>view them on a separate page as well as modify them. You can also see albums from other users.(*)</b>
- Users can view their profile and <b>edit it(*)</b>.

# Setup

* The examiner is provided with the .env keys without which the app won't work.
* Clone the repository.
* Initialise with `npm i` to install dependencies
* You will need to change the values for `REACT_APP_APP_ID` and `REACT_APP_APP_JS_KEY` in the `.env` file with the ones you have been provided with.
* Run with `npm start`
