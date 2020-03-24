import { createStore} from 'redux';
import listsReducer from './reducers/listsReducer';

const store = createStore(listsReducer);

export default store;