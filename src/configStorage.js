export const filePhotoUser = filePhoto => firebase.storage().ref(`/userProfileImgs/${filePhoto.name}`).put(filePhoto);

export const filePhotoCover = fileCover => firebase.storage().ref(`/userProfileCoverImgs/${fileCover.name}`).put(fileCover);

export const filePhotoPost = file => firebase.storage().ref(`/userProfilePostImg/${file.name}`).put(file);

// eslint-disable-next-line max-len
// export const fileVideoPost = file => firebase.storage().ref(`/userProfilePostVideo/${file.name}`).put(file);
