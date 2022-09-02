<template>
    <div class="chart-container">
        <v-chart class="chart" :option="option"/>
    </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";

import axios from 'axios';
import { baseURL } from '../../../lib/api'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
    data(){
        return{
            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            option: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Produtos mais vendidos',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 0, name: 'Carregando...' },
                            { value: 0, name: 'Carregando...' },
                            { value: 0, name: 'Carregando...' },
                            { value: 0, name: 'Carregando...' },
                            { value: 0, name: 'Carregando...' }
                        ]
                        }
                    ]
            }
        }
    },
    components: {
        VChart
    },
    methods: {
        async loadData(){
            try{
                const res = await axios.get(`${baseURL}/order/count-top-selling-products`, this.req)

                const items = res.data;

                this.option.series[0].data = items;
            }catch(err){
                console.log(err)
            }
        }
    },
    created: async function(){
        await this.loadData();
    }
}
</script>

<style scoped>

</style>

<style>
.chart-container{
    position: relative;
    width: 100%;
}
.chart {
  height: 100%;
}
</style>