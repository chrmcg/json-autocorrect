import React, { Component } from 'react';
import './App.css';
import JsonBox from './JsonBox';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: {},
            showInfo: false,
        };
    }

    render() {
        return (
            <div className="App">
                <div style={{
                    margin: '10px',
                }}>
                    <div style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <span>Permissive JSON editor by <a href='https://charliemcge.org/e'>@chrmcg</a></span>
                        <span
                            style={{
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                            onClick={() => this.setState({showInfo: !this.state.showInfo})}
                        >
                            {this.state.showInfo ? 'hide info ▴' : 'more info ▾'}
                        </span>
                    </div>

                    {this.state.showInfo ? (
                        <div style={{marginTop: '10px'}}>
                            <div>
                                <span style={{fontWeight: 'bold'}}>Functionality</span>
                                <ul>
                                    <li>Missing commas are added at newlines</li>
                                    <li>Extra commas are removed for you</li>
                                    <li>Missing quotes are added to object keys</li>
                                    <li>Single quotes are replaced with double quotes</li>
                                </ul>
                            </div>

                            <div>
                                <span style={{fontWeight: 'bold'}}>Usage</span>
                                <ul>
                                    <li>Red border: JSON is invalid</li>
                                    <li>Blue border: JSON is valid (or close enough); click outside box to reformat</li>
                                </ul>
                            </div>
                        </div>
                    ) : null}

                </div>

                <div style={{
                    flex: 1,
                    margin: '5px',
                }}>
                    <JsonBox
                        json={this.state.contents}
                        onChange={obj => this.setState({contents: obj})}
                        debug={window.location.hash === '#debug'}
                    />
                </div>
            </div>
        );
    }
}

export default App;
