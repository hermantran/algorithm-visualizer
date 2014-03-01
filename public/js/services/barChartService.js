define([
  'app',
  'd3'
], function(app, d3) {
  'use strict';
  app.service('barChartService', function(arrayService) {
    var datasets = [],
        stats = [],
        pairs = [],
        transitionLength = 0,
        svg, yScale, bars, swaps, comparisons, options;
    
    this.shuffle = d3.shuffle;
    this.fontHeight = 15;
    this.labelsHeight = 55;
    this.duration = 100;
    this.barColor = 'rgb(50, 100, 255)';
    this.highlightedColor = 'red';
    
    this.reset = function(dataset) {
      this.clearTransitions();
      this.transition(dataset, { swaps: 0, comparisons: 0 }, [0,0], 0, 0);
    };
    
    this.barChart = function(opts) {
      options = opts;
      svg = d3.select(opts.el)
        .attr('viewBox', '0 0 ' + opts.width + ' ' + opts.height)
        .attr('preserveAspectRatio', 'xMinYMin meet');
      
      this.drawBars(opts.dataset);

      swaps = svg
        .append('text')
        .text('Swaps: 0')
        .attr('x', 0)
        .attr('y', this.fontHeight);
      
      comparisons = svg
        .append('text')
        .text('Comparisons: 0')
        .attr('x', 0)
        .attr('y', 2 * this.fontHeight + 5);    
    };
    
    this.drawBars = function(dataset) {
      yScale = d3.scale.linear()
        .domain([d3.min(dataset, function(d) { return d; }), d3.max(dataset, function(d) { return d; })])
        .range([0, options.height - this.labelsHeight]);
      
      svg.selectAll('rect').data([]).exit().remove();
    
      bars = svg.selectAll('rect')
        .data(options.dataset)
        .enter()
        .append('rect')
        .attr('width', 10)
        .attr('height', function(d) { return yScale(d); })
        .attr('x', function(d, i) { return (options.width / dataset.length) * i + 5; })
        .attr('y', function(d) { return options.height - yScale(d); })
        .attr('fill', this.barColor);
    };
    
    this.clearTransitions = function() {
      datasets.length = 0;
      pairs.length = 0;
      stats.length = 0;
      transitionLength = 1;
    };
    
    this.addTransition = function(opts) {
      datasets.push(opts.dataset.slice(0));  
      pairs.push(opts.pairs.slice(0));
      stats.push(arrayService.deepCopy(opts.stats));
    };
    
    this.runTransitions = function() {
      transitionLength = datasets.length;
      for (var i = 0; i < transitionLength; ++i) {
        this.transition(datasets[i], stats[i], pairs[i], this.duration * i, i);  
      }
    };
    
    this.transition = function(dataset, stats, pairs, delay, i) {
      bars
        .data(dataset)
        .transition()
        .attr('fill', this.barColor)
        .attr('height', function(d) { return yScale(d); })
        .attr('y', function(d) { return options.height - yScale(d); })
        .duration(this.duration)
        .delay(delay);
      
      if (i !== transitionLength - 1) {
        bars
          .filter(function(d, i) { return i === pairs[0] || i === pairs[1]; })
            .transition()
            .attr('fill', this.highlightedColor)
            .duration(this.duration / 2)
            .delay(delay);
      }
      
      swaps
        .transition()
        .text('Swaps: ' + stats.swaps)
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