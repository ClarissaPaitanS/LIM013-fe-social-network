/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
const storage = () => {
  return {
    ref: () => {
      return {
        put: (filePhoto) => {
          return new Promise((resolve) => {
            resolve(`el archivo ${filePhoto.name} fue agregado a /userProfileImgs/${filePhoto.name}`);
          });
        },
      };
    },
  };
};
const firebase = {
  storage: storage,
};

export default jest.fn(() => {
  return firebase;
});
