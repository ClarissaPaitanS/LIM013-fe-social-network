// export const storage = firebase.storage();
// export const store = firebase.store();
// export const auth = firebase.auth();
// export const store = firebase.store();
const auth = firebase.auth();
// ---------------------------------------Authentication----------------------------
// SignUp User:
export const signupUser = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password)
);

// Login User:
export const loginUser = (email, password) => (
  auth.signInWithEmailAndPassword(email, password)
);

// Crea una instancia del objeto del proveedor de Google.
export const googleLogin = () => (
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
);

// Crea una instancia del objeto del proveedor de Facebook.
export const facebookLogin = () => (
  auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
);
// Cerrar Sesion.
export const closeSesion = () => auth.signOut();
