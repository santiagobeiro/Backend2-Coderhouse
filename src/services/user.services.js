import UserDao from "../Daos/user.dao.js";
const userDao = new UserDao();


export const getUsers = async () => {    
   try {
    return await userDao.getUsers();
   } catch (error) {
    console.log (error);
   }
};

export const createUser = async (user) => {
  try {
    return await userDao.createUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getUserByEmail(email);
  } catch (error) {
    console.log(error);
  }
}
