import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/notfound/NotFound";
import Cookies from "universal-cookie/cjs";
import isEmpty from "./validations/isEmpty";
import Campaigns from "./components/campaigns/Campaigns";
import Login from "./components/auth/Login";
import {red} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import CampaignDetails from "./components/campaigns/CampaignDetails";
import Subscribers from "./components/subscribers/Subscribers";

const cookies = new Cookies();
const uiTheme = cookies.get('srtres_theme');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: {
                palette: {
                    primary: {
                        light: '#96a2e8',
                        main: '#48AFFF',
                        dark: '#249aff',
                        contrastText: '#fff',
                    },
                    secondary: red,
                    type: !isEmpty(uiTheme) ? uiTheme : 'light',
                },
                typography: {
                    fontFamily: '"Roboto Condensed", sans-serif',
                },
            }
        }
    }

    componentDidMount() {
        if(isEmpty(uiTheme)) {
            cookies.set('srtres_theme', this.state.theme.palette.type, { path: '/' });
        } else {
            this.setState({theme: {palette: {type: uiTheme, ...this.state.theme.palette}, ...this.state.theme}})
        }
    }

    handleChangeTheme = () => {
        const {type} = this.state.theme.palette;
        const light = 'light', dark = 'dark';

        if(!isEmpty(type)) {
            if (type === 'dark') {
                this.setState({theme: {...this.state.theme, palette: {...this.state.theme.palette, type: light}}});
                cookies.set('srtres_theme', light, { path: '/' });
            } else {
                this.setState({theme: {...this.state.theme, palette: {...this.state.theme.palette, type: dark}}});
                cookies.set('srtres_theme', dark, { path: '/' });
            }
        }
    };

    render() {
        const {theme} = this.state;
        const muiTheme = createMuiTheme(theme);

        return (
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} handleChangeTheme={this.handleChangeTheme} uiTheme={theme.palette.type}/>
                        <PrivateRoute exact path="/campaigns" component={Campaigns} handleChangeTheme={this.handleChangeTheme} uiTheme={theme.palette.type}/>
                        <PrivateRoute exact path="/campaigns/:account" component={CampaignDetails} handleChangeTheme={this.handleChangeTheme} uiTheme={theme.palette.type}/>
                        <PrivateRoute exact path="/subscribers" component={Subscribers} handleChangeTheme={this.handleChangeTheme} uiTheme={theme.palette.type}/>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
