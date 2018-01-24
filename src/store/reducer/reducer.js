import ActionTypes from '../constant/constant';

const INITIAL_STATE = {

    todoArr: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.INSERTDATA:
            var addArr = state.todoArr;
            var addObj = {
                id: action.payload.id,
                todo: action.payload.todo
            }
            addArr.push(addObj);


            return ({ ...state, todoArr: addArr })
            break;
        case ActionTypes.DELETETODO:
            return ({
                ...state, todoArr: state.todoArr.filter(itemVal => {
                    return itemVal.id !== action.payload
                })
            })
            break;
        case ActionTypes.UPDATEVALUE:
            return ({
                ...state, todoArr: state.todoArr.map((data, ind) => {
                    if (data.id === action.payload) {
                        return {
                            todo: action.data.todo,
                            id: data.id
                        }
                    }
                    return {
                        todo: data.todo,
                        id: data.id
                    }
                })
            })
            break;
        case ActionTypes.DELETEALL:
            return ({
                ...state, todoArr: []
            })
            break;
        default:
            return state;
    }

}


