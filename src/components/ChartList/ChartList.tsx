import React, { Component } from 'react';
import { changePaginationAction, dataUpdateAction } from '../../redux/actions/RegionsActions';
import { RegionsState } from '../../redux/reducers/RegionsReducer';
import { SizeState } from '../../redux/reducers/SizeReducer';
import { Action } from '../../redux/store';
import ChartEl from './ChartEl/ChartEl';
import s from './ChartListStyle.module.css';

interface Props {
    state: RegionsState,
    sizeState: SizeState,
    dispatch: (action: Action) => void
}
export interface Region {
    title: string,
    arr: {
        title: string,
        population: number
    }[]
}
export default class ChartList extends Component<Props, {}> {
    constructor(props : any){
        super(props);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    async componentDidMount() {
        if (this.props.state.regions.length == 0) {
            let regions : Region[] = [];
            for (let query of this.props.state.regionsQuery) {
                let res = await fetch(`https://restcountries.eu/rest/v2/region/${query}`),
                    data : any[] = await res.json();
                data = data.map(item => {
                    return {
                        title: item.alpha2Code,
                        population: item.population
                    };
                }).sort((a, b) => b.population - a.population).slice(0, 10);
                
                regions.push({
                    title: query,
                    arr: data
                })
            }
    
            this.props.dispatch(dataUpdateAction(regions));
        }
    }
        

    changePagination(id: number) : void {
        this.props.dispatch(changePaginationAction(id));
    }

    render(){
        let state : RegionsState = this.props.state,
            sizeState : SizeState = this.props.sizeState,
            regionList : JSX.Element[] = state.regions.map((region, key) => {
                return (
                    <ChartEl key={key} region={region} i={'chart-' + key} smartSize={sizeState.smart} />
                );
            }),
            sizeClass = sizeState.first ? '' : sizeState.second ? s.second : s.smart;
        return (
            <div className={s.container + ' ' + (state.loader ? s.loading : '')}>
                <div className={s.loader + ' ' + (state.loader ? '' : 'hidden')}></div>
                <div className={s.wrap + ' ' + sizeClass + ' ' + (state.paginationPage == 2 ? s.next : '')}>
                    {regionList}
                    <div className={s.paginationCont + ' ' + (sizeState.first ? '' : 'hidden')}>
                        <div className={s.paginationBtn + ' ' + (state.paginationPage == 1 ? s.selected : '')}
                            onClick={() => this.changePagination(1)}
                        >1</div>
                        <div className={s.paginationBtn + ' ' + (state.paginationPage == 2 ? s.selected : '')}
                            onClick={() => this.changePagination(2)}
                        >2</div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}