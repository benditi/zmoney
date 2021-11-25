# zmoney

Documentation:
Zmoney app is designed to manage a hybrid working time of employees.
It is build in JavaScript using React framework for the frontend, and Node.js runtime for 
running the backend server. The app uses MongoDB database.

Database: Zmoney's database is made from only one collection: 'user'.
This collection keeps track of both employer and employee data.

Zmoney consists of 3 pages:
1.	Login- In this page the user logs in using his phone number and password. By checking if user is employer, the user is then transferred to either 'EmployerPage' or 'EmployeePage'.
2.	EmployeePage -The page contains employee information, a button to start the working clock and a clock. The 'clockInterval' is set to show the running time in the clock, although the time itself is calculated using this equation:
const timeDiff = (Date.now() - employee.startSession) / 1000;
The other interval is dayInterval. It is used to check every 10 seconds if the day has changed, because if day has changed and the clock isn't running, the employee timer is beeing initialised and his totalHours value is updated.
3.	EmployerPage – This page shows the employer all the relevant data of the employees. Using sockets, the employer can also see if user has started/stopped working.
