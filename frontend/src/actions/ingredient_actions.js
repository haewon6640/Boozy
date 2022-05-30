import * as IngredientApiUtil from "../util/ingredients_api_util";

export const RECEIVE_INGREDIENTS = "RECEIVE_INGREDIENTS";

const receiveIngredients = (ingredients) => ({
    type: RECEIVE_INGREDIENTS,
    ingredients
})

export const fetchIngredients = () => dispatch => (
    IngredientApiUtil.getIngredients()
        .then(res => dispatch(receiveIngredients(res.data)))
)