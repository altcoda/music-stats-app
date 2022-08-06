import Parse from 'parse/dist/parse.min.js';


export const initParse = () => {
  Parse.initialize(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_JS_KEY);
  Parse.serverURL = process.env.REACT_APP_SERVER_URL;
};


const userProps = ['username', 'description', 'birthdate', 'cover', 'icon', 'iconBorderStyle', 'dataTheme', 'objectId']


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


export const getUserData = (user) => {
  
  const data = {};

  userProps.forEach((prop) => {
      data[prop] = user.get(prop) !== undefined ? user.get(prop) : null;
  })

  return data
}


export const getUser = async(id) => {
  const User = await new Parse.Query('User');
  const user = await User.get(id);
  const data = await getUserData(user);

  return data
}


export const editUser = async(id, data) => {
  const user = await new Parse.Query('User');
  
  user.get(id)
      .then((user) => {
        Object.keys(data).forEach((prop) => {
          user.set(prop, data[prop])
        })
        user.save()
      }, (err) => {
          alert('Failed to update. Error:' + err.message)
      });
}