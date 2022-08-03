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


export const getUserData = (user) => {
  const username = user.get('username') !== undefined ? user.get('username') : null;
  const description = user.get('description') !== undefined ? user.get('description') : null;
  const birthdate = user.get('description') !== undefined ? user.get('birthdate') : null;
  const icon = user.get('avatar') !== undefined ? user.get('avatar')['_url'] : null;
  const coverImage = user.get('headerImage') !== undefined ? user.get('headerImage')['_url'] : null;
  
  return {
    username,
    description,
    birthdate,
    icon,
    coverImage
  };
}


export const getUser = async(id) => {
  const User = await new Parse.Query('User');
  const user = await User.get(id);
  const data = await getUserData(user);

  return data
}


//TODO
export const getAllUsers = async(id) => {
  const user = await new Parse.Query('User');
  const count = await user.count();
  const users = user.map(user => {
      const data = getUserData(user)

      return data
  })

  return { users, count }
}

// TODO
export const editUser = async(id, data) => {
  const User = Parse.Object.extend("User");
  const user = new User();
  
  const res = user.get(id)
      .then((user) => {
          if(data.avatar) {
              user.set('avatar[url]', data.avatar)
          }
          user.save()
      }, (err) => {
          alert('Failed to update. Error:' + err.message)
      });
  
  return res;
}