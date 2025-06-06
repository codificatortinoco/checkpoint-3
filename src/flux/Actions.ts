import { AppDispatcher } from './Dispatcher';
import { getBlocksDb, addBlockDb, getUsersDb, registerUserDb } from '../services/firebase';
import { Block } from './Store';

export const auth = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

export enum Screen {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  BOARD = 'BOARD',
}

export const screenActionType = {
  CHANGE_SCREEN: 'CHANGE_SCREEN',
};

export const blocks = {
  GET_BLOCKS: 'GET_BLOCKS',
  ADD_BLOCK: 'ADD_BLOCK',
}

export const authActions = {
  login: async (username: string) => {
    const userData = await getUsersDb();
    userData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        AppDispatcher.dispatch({
          type: auth.LOGIN,
          payload: user
        });
        console.log("User logged in:", user);
      } else {
        console.log("User not found:", username);
      }
    });
  },
  register: async (username: string, userLetter: string, userColor: string) => {
    const usersData = await getUsersDb();
    let userExists = false;
    usersData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        userExists = true;
        console.log("User already exists:", username);
      }
    });

    if(!userExists) {
      const userId = await registerUserDb(username, userLetter, userColor);
      AppDispatcher.dispatch({
        type: auth.REGISTER,
        payload: { username, userLetter, userColor }
      });
      console.log("User registered:", { username, userLetter, userId });
    }
    else {
      console.log("User registration failed, user already exists:", username);
    }
  },
  logout: async () => {
    AppDispatcher.dispatch({
      type: auth.LOGOUT,
      payload: null
    });
    console.log("User logged out");
  }
}

export const blocksActions = {
  getBlocks: async () => {
    const blockData = await getBlocksDb();
    const blockList: Block[] = [];
    blockData.docs.forEach((doc: any) => {
      const block = doc.data();
      block.blockId = doc.id; 
      blockList.push(block);
    });

    AppDispatcher.dispatch({
      type: blocks.GET_BLOCKS,
      payload: blockList
    });
  },
  addBlock: async (block: any) => {
    await addBlockDb(block);

    const blockData = await getBlocksDb();
    const blockList: Block[] = [];
    blockData.docs.forEach((doc: any) => {
      const block = doc.data();
      block.blockId = doc.id;
      blockList.push(block);
    });

    AppDispatcher.dispatch({
      type: block.ADD_BLOCK,
      payload: blockList
    });
  }
}


export const screenActions = {
  changeScreen: (newScreen: Screen) => {
    AppDispatcher.dispatch({
      type: screenActionType.CHANGE_SCREEN,
      payload: newScreen
    });
  }
}