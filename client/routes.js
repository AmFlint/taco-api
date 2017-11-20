import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Layout from "./features/Layout";
const theme = createMuiTheme();


const browserHistory = createBrowserHistory();


export const renderRoutes = () => (
    <MuiThemeProvider theme={theme}>
    <Router history={browserHistory}>
        <div>
            <Layout/>
        </div>
    </Router>
    </MuiThemeProvider>
);