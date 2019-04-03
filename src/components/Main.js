import React, { Component } from 'react';
import PrintServiceList from './PrintServiceList';


class Main extends Component {

    render() {

        return (
            <div>
                <p>Here is the main area where other components will come</p>
                <div className="TopContent">
                    <div className="InnerTopContent">
                        <h1>Hello world!</h1>
                        <PrintServiceList />
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;