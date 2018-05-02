import React, {Component} from 'react';
import * as d3 from "d3";
import {format} from "d3-format";
import {scale} from "d3-scale";
import {path} from "d3-path";
import {interpolate, interpolateDate} from "d3-interpolate";
import {scaleLinear, scaleOrdinal, scaleBand, scaleTime} from 'd3-scale';
import {axisBottom as axisBottom, axisLeft as axisLeft} from 'd3-axis';
import {timeFormat, timeParse} from 'd3-time-format';
import {min, max} from 'd3-array';
import {curveBasis, area, monotoneX as curveMonotoneX} from 'd3-shape';
import {select, selectAll} from 'd3-selection';
import PropTypes from 'prop-types';

/* Function to calculate the depth. */
function depthCount(branch) {
    if (!branch.children) {
        return 1;
    }
    return 1 + d3.max(branch.children.map(depthCount));
}

// main compnent to draw the chart
export class Bubblechart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.depthCount = this.depthCount.bind(this);
    }

    componentDidMount() {
        this.renderChart(this);
    }

    // function to render the area chart
    renderChart(that) {
        const node = this.node;
        var format;
        var diameter;
        var g;

        //define width and height
        var width = 960;
        var height = 960;
        console.log(node);

        select(node)
        diameter = 960,
        g = select(node)
            .append("g")
            .attr("transform", "translate(2,2)"),
        format = d3.format(",d");

        // creating packages..
        var pack = d3
            .pack()
            .size([diameter - 4, diameter - 4]);
// Handling data to create child parent combinations based on their Ranks...
// var root = this.props.data;
// var dataToShow = [];
// var formattedData = [];
// root.map(function (v, k) {
//     dataToShow.push({
//         "name": v.word,
//         "size": v.quartile_rank,
//         "score": v.quartile_score
//     });
// })

// var nested_data = d3.nest()
// .key(function (d) {
//     return d.score;
// })
// .entries(dataToShow);

// nested_data.map(function (v, k) {
//     formattedData.push({"name": v.key, "children": v.values})
// })
var arr = formattedData.sort(function (a, b) {
    return b.value - a.value;
});

for (var i = 0; i <= arr.length - 1; i++) {
    arr[i + 1] ? arr[i + 1].children.push(arr[i]) : "";
}

// Defining root based on their hierarchy...
root = d3.hierarchy(arr[arr.length - 1])
.sum(function (d) {
    return d.size;
})
.sort(function (a, b) {
    return b.value - a.value;
});

// color for children circles 
        var color = d3.scaleLinear()
                .domain([depthCount(root), 0])
                .range(this.props.child_color_array)
                .interpolate(d3.interpolateHcl);

// color for Parent of children circles (roots)
        var colorParent = d3.scaleLinear()
                .domain([depthCount(root), 0])
                .range(this.props.parent_color_array)
                .interpolate(d3.interpolateHcl);

// creating node 
        var nodenode = g.selectAll(".nodenode")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return d.children ? "nodenode" : "leaf nodenode";
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

//appending titles to the node.
nodenode.append("title")
.text(function (d) {
    return d.data.name + "\n" + format(d.value);
});

// drawing circles....
nodenode.append("circle")
.attr("r", function (d, i) {
    return d.r;
})
.style("fill", function (d) {
    return d.children ? colorParent(d.depth) : color(d.depth);
});

// appending text
nodenode.filter(function (d) {
    return !d.children;
}).append("text")
        .attr("dy", "0.3em")
        .text(function (d) {
            return d.data.name.substring(0, d.r / 3);
        });


    }
    render() {

        const svg = (
            <svg
                ref={node => this.node = node}
                className={'mainSvg'}
                width={960}
                height={960}
                diameter={960}></svg>
        );
        return (svg);
    }
}
