<template>
    <div>
        <div id="chart" ref="chart"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    data() {
        return {}
    },
    async mounted() {
        const height = window.innerHeight - 250;
        const width  = window.innerWidth;
        const margin = ({top: 60, right: 60, bottom: 60, left: 60});

        const grid = g => g
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .call(g => g.append("g")
            .selectAll("line")
            .data(x.ticks())
            .join("line")
                .attr("x1", d => 0.5 + x(d))
                .attr("x2", d => 0.5 + x(d))
                .attr("y1", margin.top)
                .attr("y2", height - margin.bottom))
            .call(g => g.append("g")
            .selectAll("line")
            .data(y.ticks())
            .join("line")
                .attr("y1", d => 0.5 + y(d))
                .attr("y2", d => 0.5 + y(d))
                .attr("x1", margin.left)
                .attr("x2", width - margin.right));

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width)
                .attr("y", margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text(data.x))

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(data.y));

        const data = await this.fetchUsers();
        const shape = d3.scaleOrdinal(data.map(d => d.category), d3.symbols.map(s => d3.symbol().type(s)()));
        const color = d3.scaleOrdinal(data.map(d => d.category), d3.schemeCategory10);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)).nice()
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y)).nice()
            .range([height - margin.bottom, margin.top]);

        const svg = d3.select("#chart")
            .style("background-color", "#444")
            .attr("height", height)
            .attr("width", width)
            .append("svg")

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .call(grid);

        svg.append("g")
            .attr("stroke-width", 1.5)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("path")
            .data(data)
            .join("path")
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .attr("fill", d => color(d.category))
            .attr("d", d => shape(d.category));
    },
    methods: {
        async fetchUsers() {
            try {
                const url = `${process.env.API_URL}/users/engineers`;
                let { data } = await this.$axios.get(url);

                data.forEach(function(d) {
                    d.category = d.username;
                    d.x = d.competenceHardware;
                    d.y = d.competenceSoftware;
                    delete d.username;
                    delete d.competenceSoftware;
                    delete d.competenceHardware;
                    delete d.about;
                });

                console.log(typeof data, {data});

                return data;
            } catch (error) {
                console.error('Error occured. Please try again.', error);
            }
        }
    }
}
</script>

<style scoped>
</style>