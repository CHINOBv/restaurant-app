import React, {useReducer} from 'react';

import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};

export default FirebaseState;
