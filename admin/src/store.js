import { init } from "@rematch/core";
import createModels from "./models";
import createHistory from "history/createBrowserHistory";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();
const middleware = routerMiddleware(history);

//Since we only have one store, we keep a reference here, because we need the getState function
let store = null;

export const createStore = (web3, accounts, networkId, mainAccount) => {
  store = init({
    models: createModels(web3, accounts, networkId, mainAccount),
    redux: {
      reducers: {
        router: connectRouter(history)
      },
      middlewares: [middleware]
    }
  });
  return store;
};

export const getState = () => store.getState();
