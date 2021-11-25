import { httpService } from "./http.service"

var gUsers = [
    {
        "_id": "u101",
        "isEmployer": false,
        "fullname": "David Ben Ishai",
        "phoneNumber": "0549732189",
        "password": "1234",
        "totalHours": 5.5,
        "totalSessions": 7,
        "isWorkingNow": true
    },
    {
        "_id": "u102",
        "isEmployer": false,
        "fullname": "Joni Cohen",
        "phoneNumber": "0549732337",
        "password": "1234",
        "totalHours": 22.5,
        "totalSessions": 10,
        "isWorkingNow": false
    },
    {
        "_id": "u103",
        "isEmployer": false,
        "fullname": "Moti Mizrachi",
        "phoneNumber": "0549732322",
        "password": "1234",
        "totalHours": 32.0,
        "totalSessions": 15,
        "isWorkingNow": false
    },
    {
        "_id": "u104",
        "isEmployer": true,
        "fullname": "Moti Mizrachi",
        "phoneNumber": "0549732322",
        "password": "1234",
        "totalHours": null,
        "totalSessions": null,
        "isWorkingNow": null
    },

]

export const userService = {
    getEmployees,
    getEmployee,
    updateEmployee,
    addEmployee,
    onLogin,
    setCounterDate,
    getCounterDate
}

async function getEmployees(filterBy) {
    return httpService.get('user', { params: filterBy })
}

async function getEmployee(employeeId) {
    const employee = gUsers.find(user => user._id === employeeId)
    return employee;
}

async function updateEmployee(updatedEmployee) {
    // const employeeIdx = gUsers.findIndex(employee => employee._id === updatedEmployee._id)
    // gUsers.splice(employeeIdx, 1, updatedEmployee)
    const id = updatedEmployee._id;
    console.log('updatedEmployee', updatedEmployee);
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
    const users = await getEmployees();
    const loggedInUser = users.find(user => (user.phoneNumber === phoneNumber && user.password === password));
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
        dayCount: 0
    }
    const answer = await httpService.post('user', newEmployee)
    if (answer.insertedId) return newEmployee;
    else return null;
}