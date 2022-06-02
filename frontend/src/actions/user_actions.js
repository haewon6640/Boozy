import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_FROM_SHELF = "REMOVE_FROM_SHELF";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const removeFromShelf = (ingredientId) => ({
    type: REMOVE_FROM_SHELF,
    ingredientId
})

export const fetchUser = (id) => dispatch => (
    UserApiUtil.getUser(id)
        .then(res => dispatch(receiveUser(res.data)))
)

export const addShelf = (ingredients) => dispatch => (
    UserApiUtil.addToShelf(ingredients)
        .then(res=>dispatch(receiveUser(res.data)))
)

export const deleteFromShelf = (ingredientId) => dispatch => (
    UserApiUtil.deleteFromShelf(ingredientId)
        .then(res=>dispatch(removeFromShelf(ingredientId)))
        .catch(err => {throw "err"})
)