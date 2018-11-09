const lodash = require('lodash');

const _ = [0, 0, 0];
const X = [255, 255, 255];

const initialState = [
  _, _, _, _, _, _, _, _,
  X, X, X, X, X, X, X, X,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _
];

const getNewBoard = () => lodash.clone(initialState);

module.exports =  {
  getNewBoard,
  empty: _
};