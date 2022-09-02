<template>
    <div class="chart-container-monthly-profit">
        <v-chart class="chart" :option="option"/>
    </div>
</template>

<script>
import axios from 'axios';
import {baseURL} from '../../../lib/api'
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from "vue-echarts"

echarts.use([GridComponent, BarChart, CanvasRenderer]);

export default {
    data(){
        return{
            months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [120, 200, 150, 80, 70, 110, 130],

            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mês']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [0],
                        type: 'bar'
                    }
                ]
            },

            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    },
    methods: {
        async loadData(){
            try{
                const res = await axios.get(`${baseURL}/order/calc-monthly-profit`, this.req);

                const result = res.data;

                const months = [];
                const values = [];

                result.forEach(element => {
                    months.push(element.month + "/" + element.year);
                    values.push(parseFloat(element.amount));
                });

                if(result.length > 0){
                    this.option.xAxis.data = months.reverse();
                    this.option.series[0].data = values.reverse();
                }
                
            }catch(err){
                console.log(err)
            }
        }
    },
    components: {
        VChart
    },
    created: async function(){
        await this.loadData()
    }
}
</script>

<style>
.chart-container-monthly-profit{
    position: relative;
    width: 100%;
}
</style>