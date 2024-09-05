export const getLocalStorageUser = () => {
  const usr = localStorage.getItem("user");
  if (usr) {
    return JSON.parse(usr);
  }
};
