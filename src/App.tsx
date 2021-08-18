import React, { Component} from 'react';
import './App.css';
import ChartList from './components/ChartList/ChartList';
import Navbar from './components/Navbar/Navbar';
import { Action, MainState } from './redux/store';

interface Props {
    state: MainState,
    dispatch: (action: Action) => void
}

export default class App extends Component<Props, {}> {
    constructor(props : any){
        super(props);
        
    }
    render(){
        return (
            <div className="wrap" >
                <Navbar state={this.props.state.size} dispatch={this.props.dispatch}/>
                <ChartList state={this.props.state.regions} sizeState={this.props.state.size} dispatch={this.props.dispatch}/>
            </div>
        )
    }
}
