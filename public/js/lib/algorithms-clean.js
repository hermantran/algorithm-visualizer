(function() {
  'use strict';
  var algorithms = {},
      // Stats on latest sort - runtime in ms, array element comparisons, array element accesses
      stats = {
        runtime: 0,
        comparisons: 0,
        swaps: 0
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
    
    stats.swaps++;
    algorithms.afterSwap(_array, first, second);
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
    
    stats.comparisons++;
    algorithms.afterComparison(_array, first, second);
    return bool;
  }

  algorithms.bubbleSort = function bubbleSort(array) {
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

  algorithms.cocktailSort = function cocktailSort(array) {
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

  algorithms.insertionSort = function insertionSort(array) {
    var len = array.length,
        pos,
        i,
        j;
    
    for (i = 1; i < len; ++i) {
      pos = -1;
      
      for (j = 0; j < i; ++j) {
        if (_compare(i, '<', j)) {
          pos = j;
          break;
        }
      }
      
      if (pos > -1) {
        for (j = i; j > pos; --j) {
          _swap(j, j-1);
        }
        _swap(pos, j);
      }
    }
  };

  algorithms.mergeSort = function mergeSort(array) {
    var len = array.length,
        width,
        i;
    
    for (width = 1; width < len; width *= 2) {
      for (i = 0; i < len; i += (2 * width)) {
        _merge(i, _min(i + width, len), _min(i + (2*width), len));  
      }
    }
    
    function _min(first, second) {
      return first <= second ? first : second;
    }
    
    function _merge(left, right, end) {
      var rightIndex = right,
          swapIndex = right,
          j;
      
      while (left < right) {
        if (_compare(left, '>', right)) {
          _swap(left, right);

          // Sort the swapped element correctly within the right subarray
          for (j = right; j > rightIndex; --j) {
            if (_compare(j, '<', j - 1)) {
              _swap(j, j - 1);
            } else {
              swapIndex = j;
              break;
            }
          }
          
          for (j = swapIndex; j < end - 1; ++j) {
            if (_compare(j, '>', j + 1)) {
              _swap(j, j + 1);
            } else {
              break;
            }
          }
                 
          // If not done comparing all right subarray elements, go to next element
          right = j;
          if (right > end) {
            left++;  
            right = rightIndex;
          }
        } else {
          left++;  
          right = swapIndex;
        }
      }
    }
  };

  algorithms.quickSort = function quickSort(array, left, right) {
    var len = array.length,
        middle,
        pivot;
    
    // If only the array is passed in, set the left and right
    if (arguments.length < 2) {
      left = 0;
      right = len - 1;
    }
    
    if (left < right) {
      middle = Math.round((left + right) / 2);
      pivot = _partition(left, right, middle);
      
      if (left === middle || right === middle) {
        return;  
      }
      
      quickSort(array, left, pivot - 1);
      quickSort(array, pivot + 1, right); 
    }
     
    function _partition(left, right, pivot) {
      var storeIndex = left,
          i;
      
      _swap(pivot, right);
      
      for (i = left; i < right; ++i) {
        // The right index now holds the pivot value, so this compares the pivot value
        if  (_compare(i, '<=', right)) {
          if (i !== storeIndex) {
            _swap(i, storeIndex);
          }
          storeIndex++;
        }
      }
      
      _swap(right, storeIndex);
      return storeIndex;
    }
  };

  algorithms.selectionSort = function selectionSort(array) {
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

  // Add the internal helper functions for read-only
  if ('defineProperties' in Object) {
    Object.defineProperties(algorithms, {
      afterSwap: {
        enumerable: false,
        writable: true
      },
      afterComparison: {
        enumerable: false,
        writable: true
      },
      stats: {
        enumerable: false,
        writable: true
      },
      _swap: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: _swap
      },
      _compare: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: _compare
      }
    });
  }

  // Add these properties after each algorithm property is prepared
  algorithms.afterSwap = function() {};
  algorithms.afterComparison = function() {};
  algorithms.stats = stats;

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