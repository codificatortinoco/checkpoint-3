import { AppDispatcher } from './Dispatcher';
import { Action } from './Dispatcher';
import {auth, blocks, blocksActions, Screen, screenActionType } from './Actions';

type Callback = () => void;

export type Block = {
  letter: string,
  color: string,
  blockId: string,
  location: number,
}

export type User = {
  username: string,
  userType: string,
}

export type State = {
  currentUser: User | null,
  blockList: Block[],
  screen: Screen,
}

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
      currentUser: null,
      blockList: [],
      screen: Screen.REGISTER,
  }

  private _listeners: Listener[] = [];

  constructor() {
      AppDispatcher.register(this._handleActions.bind(this)); 
  }

  getState() {
      return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {

      case blocks.GET_BLOCKS:
        this._myState.blockList = action.payload as Block[];
        this._emitChange();
        break;
      case blocks.ADD_BLOCK:
        this._myState.blockList = action.payload as Block[];
        this._emitChange();
        break;
      case screenActionType.CHANGE_SCREEN:
        this._myState.screen = action.payload as Screen;
        this._emitChange();
        break;
      case auth.LOGIN:
        this._myState.currentUser = action.payload as User;
        this._myState.screen = Screen.BOARD; 
        this._emitChange();
        break;
      case auth.LOGOUT:
        this._myState.currentUser = null;
        this._myState.screen = Screen.LOGIN; 
        this._emitChange();
        break;
      default:
        break;
    }
    this.persist();
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
        listener(state);
    }
  }


  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState()); 
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      this._myState = JSON.parse(persistedState);
      this._emitChange(); 
    }
  }
}
export const store = new Store();