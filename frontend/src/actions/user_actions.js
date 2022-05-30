import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (id) => dispatch => (
    UserApiUtil.getUser(id)
        .then(res => dispatch(receiveUser(res.data)))
)

export const addShelf = (ingredients) => dispatch => (
    UserApiUtil.addToShelf(ingredients)
        .then(res=>dispatch(receiveUser(res.data)))
)