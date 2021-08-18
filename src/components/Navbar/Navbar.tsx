import React, { Component } from 'react';
import { changeSizeAction } from '../../redux/actions/SizeActions';
import { SizeState } from '../../redux/reducers/SizeReducer';
import { Action } from '../../redux/store';
import s from './NavbarStyle.module.css';

interface Props {
    state: SizeState,
    dispatch: (action: Action) => void
}

export default class Navbar extends Component<Props, {}> {
    constructor(props : any){
        super(props);
        this.changeSize = this.changeSize.bind(this);
    }

    private changeSize(id: string) : void {
        this.props.dispatch(changeSizeAction(id));
    }

    render(){
        let state : SizeState = this.props.state;
        return (
            <div className={s.container}>
                <div className={s.title}>
                    <span className={s.icon}></span>
                </div>
                <div className={s.sizeBtnCont}>
                    <div className={s.sizeBtn + ' ' + (state.first ? s.selected : '')}
                        onClick={() => this.changeSize('first')}
                    >
                        <span className={s.like}></span>
                        1 X 3
                    </div>
                    <div className={s.sizeBtn + ' ' + (state.second ? s.selected : '')}
                        onClick={() => this.changeSize('second')}
                    >
                        <span className={s.like}></span>
                        2 X 3
                    </div>
                    <div className={s.sizeBtn + ' ' + (state.smart ? s.selected : '')}
                        onClick={() => this.changeSize('smart')}
                    >
                        <span className={s.like}></span>
                        Smart
                    </div>
                </div>
            </div>
        )
    }
}