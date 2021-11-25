import React from 'react'

import { Routes, Route } from 'react-router'

import routes from './routes'
export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <main>
                    <Routes>
                        {routes.map(route=> <Route key={route.path} exact element={route.element} path={route.path} /> )}
                    </Routes>
                </main>
            </div>
        )
    }
}


