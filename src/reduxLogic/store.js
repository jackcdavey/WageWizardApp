import {createStore} from 'redux'
import Reducer from './reducer.js'

const store = createStore(Reducer);

export {store}