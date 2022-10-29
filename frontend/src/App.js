import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout";
import Register from "./containers/Register";
import Login from "./containers/Login";
import {useSelector} from "react-redux";
import NewPhoto from "./containers/NewPhoto";
import Photos from "./containers/Photos";
import UserPhotos from "./containers/UserPhotos";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Photos}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>

                <Route path="/gallery/:id" component={UserPhotos}/>

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/new-photo"
                    component={NewPhoto}
                />

            </Switch>
        </Layout>
    );
};

export default App;