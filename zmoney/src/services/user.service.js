import { httpService } from "./http.service"

export const userService = {
    getEmployees,
    getEmployee,
    updateEmployee,
    addEmployee,
    onLogin,
    getLoggedinUser,
    setCounterDate,
    getCounterDate
}

const STORAGE_KEY = 'USER';
async function getEmployees(filterBy) {
    return httpService.get('user', { params: filterBy })
}

async function getEmployee(employeeId) {
    const id = employeeId;
    return httpService.get(`user/${id}`)
}

async function updateEmployee(updatedEmployee) {
    const id = updatedEmployee._id;
    const user = await httpService.put(`user/${id}`, updatedEmployee);
    return user;
}

async function setCounterDate(date) {
    localStorage.setItem('DATE', JSON.stringify(date))
    return
}

async function getCounterDate() {
    const date = JSON.parse(localStorage.getItem('DATE'));
    return date;
}

async function onLogin(phoneNumber, password) {
    const loggedInUser = await httpService.post('auth', {phoneNumber, password})
    console.log('loggedInUser', loggedInUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
    return loggedInUser;
}

async function addEmployee(fullname, phoneNumber, password) {
    const newEmployee = {
        isEmployer: false,
        fullname,
        phoneNumber,
        password,
        totalHours: 0,
        totalSessions: 0,
        isWorkingNow: false,
        startSession: 0,
        dayCount: 0,
        startingDate:0
    }
    const answer = await httpService.post('user', newEmployee)
    if (answer.insertedId) {
        newEmployee._id = answer.insertedId;
        return newEmployee;
    }
    else return null;
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}