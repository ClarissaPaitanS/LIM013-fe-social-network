export const filePhotoUser = filePhoto => firebase.storage().ref(`/userProfileImgs/${filePhoto.name}`).put(filePhoto);

export const filePhotoCover = fileCover => firebase.storage().ref(`/userProfileCoverImgs/${fileCover.name}`).put(fileCover);
