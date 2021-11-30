import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { userService } from '../services/user.service';


const initialState = {
    employees:[],
    user: userService.getLoggedinUser()
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
        case 'LOGOUT':
            return {...state, user: null}
        default: return state;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(myReducer, composeEnhancers(applyMiddleware(thunk)))