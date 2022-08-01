import Parse from 'parse/dist/parse.min.js';


export const initParse = () => {
  Parse.initialize(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_JS_KEY);
  Parse.serverURL = process.env.REACT_APP_SERVER_URL;
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`);
  return JSON.parse(currentUser)
};

export const logoutUser = async () => {
  try {
    await Parse.User.logOut()
  } catch (error) {
    alert(`Error! ${error.message}`)
    return false;
  }
};
