import { userService } from "../services/user.service"

export function onGetEmployees() {
    return async (dispatch) => {
        try {
            const employees = await userService.getEmployees('employee')
            dispatch({ type: 'SET_EMPLOYEES', employees })
        } catch (err) {
            console.log(err);
        }
    };
}

export function onUpdateEmployee(updatedEmployee) {
    return async (dispatch) => {
        try {
            const employee = await userService.updateEmployee(updatedEmployee)
            dispatch({ type: 'UPDATE_EMPLOYEE', employee })
        } catch (err) {
            console.log(err);
        }
    }
}

export function onUserLogin(phoneNumber, password) {
    return async (dispatch) => {
        try {
            const user = await userService.onLogin(phoneNumber, password)
            if (!user) return null;
            console.log('store login:', user);
            dispatch({type:'SET_USER', user})
            return user;
        } catch (err) {
            console.log(err);
        }
    }
}

export function onAddNewEmployee(fullname, phoneNumber, password){
    return async (dispatch) => {
        try {
            const user = await userService.addEmployee(fullname, phoneNumber, password)
            dispatch({type:'ADD_USER', user})
        } catch (err) {
            console.log(err);
        }
    }
}