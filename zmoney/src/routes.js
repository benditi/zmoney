
import {Login} from './pages/login.jsx';
import { EmployerPage } from './pages/employer-page.jsx';
import { EmployeePage } from './pages/employee-page.jsx';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path:'/employer',
        element: <EmployerPage/>,
        label: 'Employer',
    },
    {
        path:'/employee',
        element: <EmployeePage/>,
        label: 'Employee',
    },
    {
        path:'/',
        element: <Login/>,
        label: 'Login',
    }
]

export default routes;