import React from 'react'
import routes from './routes/index'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './Store'

// console.log(routes);
const App =(
    <Provider store={store}>
        <Router>
            {renderRoutes(routes)}
        </Router>
    </Provider>
)

export default App