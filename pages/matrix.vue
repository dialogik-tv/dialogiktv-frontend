<template>
    <div style="padding-top:0!important;padding-bottom:0!important;">
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
        const height = window.innerHeight - 100;
        const width  = window.innerWidth;
        const margin = ({top: 60, right: 60, bottom: 60, left: 60});

        // Helper grid
        const grid = g => g
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", .25)
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

        // X-axis
        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width)
                .attr("y", margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text(data.x));

        // Y-axis
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

        // Fetch engineers matrix data
        const data = await this.fetchEngineers();

        // Map shapes and colors
        const shape = d3.scaleOrdinal(data.map(d => d.category), d3.symbols.map(s => d3.symbol().type(s)()));
        const color = d3.scaleOrdinal(data.map(d => d.category), d3.schemeCategory10);

        // X value definitions
        const x = d3.scaleLinear()
            .domain([0, 100]).nice()
            .range([margin.left, width - margin.right]);

        // Y value defintions
        const y = d3.scaleLinear()
            .domain([0, 100]).nice()
            .range([height - margin.bottom, margin.top]);

        // Create main svg element
        const svg = d3.select("#chart")
            // .style("background-color", "#444")
            .append("svg")
            .attr("height", height)
            .attr("width", width)
        
        // Append axis and grid
        svg.append("g")
            .call(xAxis);
        svg.append("g")
            .call(yAxis);
        svg.append("g")
            .call(grid);

        // Add engineers to chart
        let engineer = svg.append("g")
            .attr("stroke-width", 1.5)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("path")
            .data(data)
            .join("path")
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .attr("fill", d => color(d.category))
            // .attr("d", 10);
            .attr("d", d => shape(d.category));

        engineer
            .append("svg:circle")
            .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
            .style("fill", "#eee");

        engineer
            .append("svg:image")
            .attr("xlink:href", function(d) { return "/matrix/code_56x56.png"; })
            .attr("x", function(d) { return -25;})
            .attr("y", function(d) { return -25;})
            .attr("height", 50)
            .attr("width", 50);

        // Handle mouse actions
        // engineer
        //     .on("click", function(d) {
        //         alert('YES');
        //         console.log(d);
        //     })
    },
    methods: {
        async fetchEngineers() {
            try {
                const url = `${process.env.API_URL}/users/engineers`;
                let { data } = await this.$axios.get(url);
                console.log(data);

                data.forEach(function(d) {
                    // Set Twitch channel name
                    if(d.twitchChannel == null) {
                        d.channel = d.username;
                    } else {
                        d.channel = d.twitchChannel;
                    }

                    // Set competences
                    d.x = d.competenceHardware;
                    d.y = d.competenceSoftware;

                    // Set category
                    if(d.x > d.y) {
                        d.category = 'Hardware';
                    } else {
                        if(d.y == d.x) {
                            d.category = 'Allrounder';
                        } else {
                            d.category = 'Software';
                        }
                    }

                    // Delete unneeded attributes
                    delete d.username;
                    delete d.twitchChannel;
                    delete d.competenceSoftware;
                    delete d.competenceHardware;
                });

                // console.log(data);
                return data;
            } catch (error) {
                console.error('Error fetching engineers. Please try again.', error);
            }
        }
    }
}
</script>

<style scoped>
</style>