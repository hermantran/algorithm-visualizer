define([
  'app',
  'd3'
], function(app, d3) {
  'use strict';
  app.service('d3', function() {
    var transitions = [],
        stats = [],
        svg, yScale, bars, text, accesses, comparisons, options;
    
    this.shuffle = d3.shuffle;
    this.duration = 100;
    
    this.reset = function(dataset) {
      this.transition(dataset, { accesses: 0, comparisons: 0 }, 0);
      transitions.length = 0;
      stats.length = 0;
    };
    
    this.barChart = function(opts) {
      options = opts;
      svg = d3.select(opts.el)
        .attr('viewBox', '0 0 ' + opts.width + ' ' + opts.height)
        .attr('preserveAspectRatio', 'xMinYMin meet');
      
      yScale = d3.scale.linear()
        .domain([d3.min(opts.dataset, function(d) { return d; }), d3.max(opts.dataset, function(d) { return d; })])
        .range([0, opts.height - 55]);
    
      bars = svg.selectAll('rect')
        .data(opts.dataset)
        .enter()
        .append('rect')
        .attr('width', '10')
        .attr('height', function(d) { return yScale(d); })
        .attr('x', function(d, i) { return (opts.width / opts.dataset.length) * i + 5; })
        .attr('y', function(d) { return opts.height - yScale(d); })
        .attr('fill', function(d) { return "rgb(" + 50 + ", " + 100 + ", 255)"; });
  
      text = svg.selectAll('text')
        .data(opts.dataset)
        .enter()
        .append('text')
        .attr('x', function(d, i) { return (opts.width / opts.dataset.length) * i + (250 / opts.dataset.length) + 5; })
        .attr('y', function(d) { return opts.height - 5 - yScale(d); })
        .style('text-anchor', 'middle')
        .text(function(d) { return d; });
      
      accesses = svg
        .append('text')
        .text('Accesses: ' + opts.stats.accesses)
        .attr('x', 0)
        .attr('y', 15);
      
      comparisons = svg
        .append('text')
        .text('Comparisons: ' + opts.stats.comparisons)
        .attr('x', 0)
        .attr('y', 35);
    };
    
    this.clearTransitions = function() {
      transitions.length = 0; 
      stats.length = 0;
    };
    
    this.addTransition = function(opts) {
      transitions.push(JSON.parse(JSON.stringify(opts.dataset)));  
      stats.push(JSON.parse(JSON.stringify(opts.stats)));
    };
    
    this.runTransitions = function() {
      for (var i = 0; i < transitions.length; ++i) {
        this.transition(transitions[i], stats[i], this.duration * i);  
      }
    };
    
    this.transition = function(dataset, stats, delay) {
      bars
        .data(dataset)
        .transition()
        .attr('height', function(d) { return yScale(d); })
        .attr('x', function(d, i) { return (options.width / dataset.length) * i + 5; })
        .attr('y', function(d) { return options.height - yScale(d); })
        .duration(this.duration)
        .delay(delay);
    
      text
        .data(dataset)
        .transition()
        .attr('x', function(d, i) { return (options.width / dataset.length) * i + (250 / dataset.length) + 5; })
        .attr('y', function(d) { return options.height - 5 - yScale(d); })
        .text(function(d) { return d; })
        .duration(this.duration)
        .delay(delay);
      
      accesses
        .transition()
        .text('Accesses: ' + stats.accesses)
        .duration(this.duration)
        .delay(delay);
      
      comparisons
        .transition()
        .text('Comparisons: ' + stats.comparisons)
        .duration(this.duration)
        .delay(delay);
    };
  });
});