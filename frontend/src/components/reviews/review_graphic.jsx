import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { pie } from 'd3';

export default function ReviewGraphic() {
  let name = "Drinkypoo"
  let review = {
    flavor_profile: {
      spicy:5,
      sweet:2,
      sour:3,
      bitter:4,
      salty:5,
      umami:1,
      rating:5
    },
    title: "Sure, its orange and driqable",
    body:"heay, this one was g-reatbey!"
  }
  //update with props.review.flavor_profile
  let chartData=[];
  Object.keys(review.flavor_profile).slice(0,6).forEach((variable)=>{
    chartData.push({item:variable, count:review.flavor_profile[variable]})
  })
  
  const pieChart = useRef();
  
  useEffect(()=>{
    const pieData = d3.pie().value(d=>d.count)(chartData)
    const arc = d3.arc().innerRadius(0).outerRadius(150)
    const colors = d3.scaleOrdinal(["DarkRed", "limegreen", "yellow", "blue", "orange", "violet"])
    const svg = d3.select(pieChart.current)
        .attr('width', '300')
        .attr('height', '300')
        .append('g')
        .attr('transform', 'translate(150, 150)');

    // const tooldiv = d3.select('#chart-area')
    //       .append('div')
    //       .style('visbility', 'hidden')
    //       .style('position', 'absolute')


    svg.append('g').selectAll('path').data(pieData).join('path')
        .attr('d', arc)
        .attr('fill', (d,i)=>colors(i))
        .attr('stroke', 'white')
        .text(function(d){return d.data.item})

    svg.selectAll('slices').data(pieData)
        .enter()
        .append('text')
        .text(function(d){return d.data.item})
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 17)


        // .on('mouseover', (e,d)=> {
        //   tooldiv.style('visibility', 'visible')
        //   .text(`${d.data.item}:` + `${d.data.count}`)
        // })
        // .on('mousemove', (e,d)=>{
        //   tooldiv.style('top', (e.pageY-50) + 'px')
        //     .style('left', (e.pageX-50) + 'px')
        // })
        // .on('mouseout',()=> {
        //   tooldiv.style('visibility', 'hidden')
        // })
  });


  return (
    <div>
      <div id='chart-area'></div>
      <svg ref={pieChart} className="review-graphics-container"/>
    </div>
    
  )
}
