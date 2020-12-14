import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../commonComponents/Loader'
import NavbarTab from '../commonComponents/NavbarTab'
const Home = React.lazy(() => import('../pages/Home'));
const NotFound = React.lazy(() => import('../commonComponents/NotFound'));

class Routing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="body-wrapper">
                <Route path="/" render={(props) => <NavbarTab {...props} />} />
                <Suspense fallback={<Loader color="info" />}>
                    <Switch>
                        <Route exact path="/home" render={(props) => <Home {...props} />} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </div>
        )
    }
}

export default Routing;