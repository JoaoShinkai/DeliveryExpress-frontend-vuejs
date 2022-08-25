<template>
    <div class="chart-container-monthly-profit">
        <v-chart class="chart" :option="option"/>
    </div>
</template>

<script>

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from "vue-echarts"

echarts.use([GridComponent, BarChart, CanvasRenderer]);

export default {
    data(){
        return{
            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                    }
                ]
            }
        }
    },
    components: {
        VChart
    }
}
</script>

<style>
.chart-container-monthly-profit{
    position: relative;
    width: 100%;
}
</style>