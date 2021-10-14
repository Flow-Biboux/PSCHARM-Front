import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    feedList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FEEDS_LIST:
            return { ...state, feedList: action.payload };
        default:
            return { ...state };
    }
}

export default reducer