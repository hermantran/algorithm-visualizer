(function() {
  'use strict';
  var algorithms = {},
      // Stats on latest sort - runtime in ms, array element comparisons, array element accesses
      _stats = {
        runtime: 0,
        comparisons: 0,
        accesses: 0
      },
      // Storing reference to array to be sorted, for use with internal helper functions
      _array,
      // Timestamp function to benchmark the runtime of each sorting algorithm,
      _now;
  
  _now = (function(){
    var now;
    
    if (typeof window === 'undefined') {
      // http://stackoverflow.com/questions/11725691/how-to-get-a-microtime-in-node-js
      now = function now() {
        var hrTime = process.hrtime();
        return (hrTime[0] * 1000 + hrTime[1] / 1000);
      };
    } else { 
      // performance.now() polyfill https://gist.github.com/paulirish/5438650
      if (typeof window.performance === 'undefined') {
        window.performance = {};
      }
    
      if (!window.performance.now) {
        var nowOffset = Date.now();
      
        if (performance.timing && performance.timing.navigationStart) {
          nowOffset = performance.timing.navigationStart;
        }
      
        window.performance.now = function now() {
          return Date.now() - nowOffset;
        };
      }
      
      now = function() {
        return window.performance.now();
      };
    }
    
    return now;
  })();
  
  // Swaps the values at two given array indexes - two array element accesses
  function _swap(first, second) {
    var temp;
    
    if (first === second) {
      return; 
    }
    
    temp = _array[first];
    _array[first] = _array[second];
    _array[second] = temp;
    _stats.accesses += 2;
    algorithms.afterAccess(_array);
  }
  
  // Sets the value of at an array index - one array element access
  function _set(index, value) {
    _array[index] = value;
    _stats.accesses++;
    algorithms.afterAccess(_array);
  }
  
  // Compares the value at two given array indexes
  function _compare(first, operator, second) {
    var bool;
    
    if (operator === '>') {
      bool = _array[first] > _array[second];    
    }
    else if (operator === '>=') {
      bool = _array[first] >= _array[second];  
    }
    else if (operator === '<') {
      bool = _array[first] < _array[second];    
    } 
    else if (operator === '<=') {
      bool = _array[first] <= _array[second];
    } else {
      throw new Error('Unknown operator used.');  
    }
    
    _stats.comparisons++;
    algorithms.afterComparison(_array, first, second);
    return bool;
  }

  algorithms.bubbleSort = function(array) {
    var len = array.length,
        swapped,
        i,
        j;
    
    for (i = 0; i < len; ++i) {
      swapped = false;
      
      for (j = 0; j < len - 1; ++j) {
        if (_compare(j, '>', j+1)) {
          _swap(j, j+1);
          swapped = true;
        }
      }
      
      if (!swapped) {
        break;
      }
    }
  };

  algorithms.cocktailSort = function(array) {
    var len = array.length,
        swapped,
        i,
        j;
    
    for (i = 0; i < len; ++i) {
      swapped = false;
      
      // Move smallest value to beginning
      if (i % 2) {
        for (j = len - 1; j > 0; --j) {
          if (_compare(j-1, '>', j)) {
            _swap(j-1, j);
            swapped = true;
          }
        }
      // Most largest value to end
      } else {
        for (j = 0; j < len - 1; ++j) {
          if (_compare(j, '>', j+1)) {
            _swap(j, j+1);
            swapped = true;
          }
        }
      }
      
      if (!swapped) {
        break;
      }
    }
  };

  algorithms.insertionSort = function(array) {
    var len = array.length,
        temp,
        pos,
        i,
        j;
    
    for (i = 1; i < len; ++i) {
      pos = -1;
      
      for (j = 0; j < i; ++j) {
        if (_compare(i, '<', j)) {
          pos = j;
          temp = array[i];
          break;
        }
      }
      
      if (pos > -1) {
        for (j = i; j > pos; --j) {
          _set(j, array[j-1]);
        }
        _set(pos, temp);
      }
    }
  };

  algorithms.quickSort = (function() {
    var prevPivot = [];
    
    function _quicksort(array, left, right) {
      var len = array.length,
          middle,
          pivot;
      
      if (left === undefined && right === undefined) {
        prevPivot.length = 0;
      }
      
      left = left || 0;
      right = right || len - 1;
      
      if (left < right) {
        middle = Math.round((left + right) / 2);
        pivot = _partition(array, left, right, middle);
        
        if (prevPivot.indexOf(pivot) < 0) {
          prevPivot.push(pivot);
          _quicksort(array, left, pivot - 1);
          _quicksort(array, pivot + 1, right); 
        }
      }
    }
    
    function _partition(array, left, right, pivot) {
      var storeIndex = left,
          i;
      
      _swap(pivot, right);
      
      for (i = left; i < right; ++i) {
        // The right index now holds the pivot value, so this compares the pivot value
        if  (_compare(i, '<=', right)) {
          _swap(i, storeIndex);
          storeIndex++;
        }
      }
      
      _swap(right, storeIndex);
      return storeIndex;
    }
    
    return _quicksort;
  })();

  algorithms.selectionSort = function(array) {
    var len = array.length,
        min,
        i,
        j;
    
    for (i = 0; i < len - 1; ++i) {
      min = i;
      for (j = i + 1; j < len; ++j) {
        if (_compare(j, '<', min)) {
          min = j;
        }
      }
      
      _swap(i, min);
    }
  };

  // Add these properties after each algorithm property is prepared
  algorithms.afterAccess = function() {};
  algorithms.afterComparison = function() {};
  algorithms.stats = _stats;

  // http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = algorithms;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return algorithms;
      });
    } else {
      window.algorithms = algorithms;
    }
  }
})();