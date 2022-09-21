<template>
  <v-chart
    class="chart"
    :option="option"
    autoresize
    v-on:mouseover="mouseOver"
    v-on:mouseout="mouseOut"
  ></v-chart>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);
export default {
  components: { VChart },
  props:['fetchData'],
  data(){ return {
    values:[],
    immatriculations: this.immatriculations,
    datesArray: [],
    option: {
      series: [
        {  data: [],
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "50%"],
          textAlign: "center",
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#e5e5e5",
            borderWidth: 5,
          },
          label: {
            show: true,
            formatter: "{b}\n{c}",
            alignTo: "edge",
            minMargin: 10,
            lineHeight: 25,
            edgeDistance: 30,
            fontSize: 14,
            fontWeight: 700,
            color: "black",
            fontStyle: "italic",
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80,
          },
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < 400 / 2;
            const points = params.labelLinePoints;
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          },    
        },
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "50%"],
          textAlign: "center",
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#e5e5e5",
            borderWidth: 5,
          },
          label: {
            show: false,
            verticalAlign: "middle",
            align: "center",
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "25",
              fontWeight: 900,
              formatter: "{d}%",
              backgroundColor: "#e5e5e5",
            },
          },
          data: [],
        },
      ],
      color: [
        "rgba(240,164,67,0.4)",
        "rgba(240,164,67,0.8)",
        "rgba(49,54,203,0.4)",
        "rgba(49,54,203,0.8)",
      ],
      title: {
        show: true,
        x: "center",
        y: "center",
      },
    },
  }},
  async mounted() {
      await this.formalityChart()
     console.log("FetchData" , this.immatriculations)   
    this.values =[
      { value : this.immatriculations.length , name:"Immatriculations" } , 
      { value : this.modifications.length, name:"Modifications"} , 
      { value :this.radiations.length , name:"Radiations" } ,
      {value :this.regularisations.length, name :"Regularisations"}]
    this.option.series[0].data.push(...this.values)
    this.option.series[1].data.push(...this.values)
  },
  methods: {
    mouseOver() {
      this.option.title.show = false;
    },
    mouseOut() {
      this.option.title.show = true;
    },
    async formalityChart() {
        this.eventsObjects =this.fetchData.map(function (value) {
          return {
            formaliteType: value.formaliteType,
          };
        });
        this.immatriculations = this.eventsObjects.filter((value) =>  value.formaliteType === 'immatriculation');
        this.modifications = this.eventsObjects.filter((value) =>  value.formaliteType === 'modification');
        this.radiations = this.eventsObjects.filter((value) =>  value.formaliteType === 'radiation');
        this.regularisations = this.eventsObjects.filter((value) =>  value.formaliteType === 'regularisation');
      }
    },
};
</script>

<style>
.chart {
  width: 100%;
  height: 400px;
}
</style>