import React, { Component } from 'react';
import s from './ChartElStyle.module.css';
import * as echarts from 'echarts/core';
import {
    PieChart,
    PieSeriesOption
} from 'echarts/charts';
import {
    TitleComponent,
    TitleComponentOption,
    GridComponent,
    GridComponentOption,
    TooltipComponent,
    VisualMapComponent,
    LegendComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

// Combine an Option type with only required components and charts via ComposeOption
type ECOption = echarts.ComposeOption<
    TitleComponentOption | GridComponentOption | PieSeriesOption
>;

// Register the required components
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, PieChart, VisualMapComponent, LegendComponent]
);

interface Props {
    region: {
        title: string,
        arr: {
            title: string,
            population: number
        }[]
    },
    i: string,
    smartSize: boolean
}

export default class ChartEl extends Component<Props, {}> {
    option: ECOption;
    constructor(props : any){
        super(props);
        let min : number = +this.props.region.arr[0].population, 
            max : number = +this.props.region.arr[0].population;
        let arr = this.props.region.arr.map((item, i)=> {
            let population : number = +item.population;
            if (population > max) {
                max = population;
            }
            if (population < min) {
                min = population;
            }
            return {
                value: item.population,
                name: item.title
            }            
        });
        this.option = {
            visualMap: {
                show: false,
                min: min,
                max: max,
                inRange: {
                    colorLightness: [.2, .5]
                }
            },
            series : [
                {   
                    name: this.props.region.title,
                    type: 'pie',
                    radius: '55%',
                    data: arr,
                    itemStyle: {
                        color: "#c96c65"
                    },
                    clockwise: false,
                    roseType: 'radius', 
                    label: {
                        color: "#737679"
                    }           
                },
                
            ],
            title: {
                text: `{s|${this.props.region.title}}`,
                textStyle: {
                    rich: {
                        s: {
                            color: '#edeeee',
                            lineHeight: 30,
                            fontSize: '20px'
                        },
                    },
                },
                left: 'center'
            },
            
        };

        this.initEcharts = this.initEcharts.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() : void {
        this.initEcharts();
    }

    componentDidUpdate() : void {
        echarts.dispose(document.getElementById(this.props.i) as unknown as HTMLDivElement);
        this.initEcharts();
    } 

    initEcharts() : void {
        let chartEl = echarts.init(
            document.getElementById(this.props.i) as unknown as HTMLDivElement
        );

        chartEl.setOption(this.option);
    }

    render(){
        let styleChart = this.props.smartSize ? {height: '50vh', width: '90vw'} 
            : {height: '50vh', width: '33vw'};

        return (
            <div className={s.container} >
                <div id={this.props.i} style={styleChart}></div>
            </div>
        )
    }
}