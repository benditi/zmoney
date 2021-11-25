import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


const initialState = {
    employees:[],
    user: null
}

function myReducer(state = initialState, action) {
    var newEmployees;
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {...state, employees: action.employees }
        case 'UPDATE_EMPLOYEE':
            newEmployees = state.employees.map(employee => (employee._id===action.employee._id)? action.employee : employee)
            return {...state, 
                employees: newEmployees }
        case 'SET_USER':
            return {...state, user: action.user}
        case 'ADD_USER':
            return {...state, employees: [...state.employees, action.user]}
        default: return state;
    }
    // For debug:
    // window.storeState = newState;
    // return newState;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(myReducer, composeEnhancers(applyMiddleware(thunk)))