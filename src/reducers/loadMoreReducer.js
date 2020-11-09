const initialState = {
  beersData: [],
};
const actionTypes = {
  update_beer_data: "UPDATE_BEER_DATA",
  new_beer_data: "NEW_BEER_DATA",
};
const loadMoreReducer = (state = initialState, action) => {
  if (action.type === actionTypes.update_beer_data) {
    return {
      ...state,
      beersData: [...state.beersData, ...action.value],
    };
  } else if (action.type === actionTypes.new_beer_data) {
    return {
      beersData: [...action.value],
    };
  } else {
    return state;
  }
};
export default loadMoreReducer;
