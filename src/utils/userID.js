// 持久化储存用户的ID，用户的信息需要id发请求
export const setUserId = (id) => {
  localStorage.setItem("USERID", id);
};
export const getUserId = () => {
  localStorage.getItem("USERID");
};
export const removeToken = () => {
  localStorage.removeItem("USERID");
};
