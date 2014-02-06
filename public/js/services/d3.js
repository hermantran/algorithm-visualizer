define([
  'app',
  'd3'
], function(app, d3) {
  app.service('d3', function() {
    var transitions = [],
        svg, yScale, bars, text, options;
    
    this.shuffle = d3.shuffle;
    
    this.reset = function(dataset) {
      this.transition(dataset, 0);
      transitions.length = 0;
    };
    
    this.barChart = function(opts) {
      options = opts;
      svg = d3.select(opts.el);
      
      yScale = d3.scale.linear()
        .domain([d3.min(opts.dataset, function(d) { return d; }), d3.max(opts.dataset, function(d) { return d; })])
        .range([0, opts.height - 20]);
    
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
    };
    
    this.clearTransitions = function() {
      transitions.length = 0;  
    };
    
    this.addTransition = function(dataset) {
      transitions.push(JSON.parse(JSON.stringify(dataset)));  
    };
    
    this.runTransitions = function() {
      for (var i = 0; i < transitions.length; ++i) {
        this.transition(transitions[i], 100 * i);  
      }
    };
    
    this.transition = function(dataset, delay) {
      bars
        .data(dataset)
        .transition()
        .attr('height', function(d) { return yScale(d); })
        .attr('x', function(d, i) { return (options.width / dataset.length) * i + 5; })
        .attr('y', function(d) { return options.height - yScale(d); })
        .duration(100)
        .delay(delay);
    
      text
        .data(dataset)
        .transition()
        .attr('x', function(d, i) { return (options.width / dataset.length) * i + (250 / dataset.length) + 5; })
        .attr('y', function(d) { return options.height - 5 - yScale(d); })
        .text(function(d) { return d; })
        .duration(100)
        .delay(delay);
    };
  });
});