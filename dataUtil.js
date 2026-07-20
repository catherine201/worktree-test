(function (global) {
  function isObject(value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function deepClone(value, stack) {
    if (!isObject(value)) return value;
    stack = stack || new WeakMap();
    if (stack.has(value)) return stack.get(value);

    if (value instanceof Date) return new Date(value.getTime());

    if (value instanceof RegExp) {
      var re = new RegExp(value.source, value.flags);
      re.lastIndex = value.lastIndex;
      return re;
    }

    if (value instanceof Map) {
      var map = new Map();
      stack.set(value, map);
      value.forEach(function (v, k) {
        map.set(deepClone(k, stack), deepClone(v, stack));
      });
      return map;
    }

    if (value instanceof Set) {
      var set = new Set();
      stack.set(value, set);
      value.forEach(function (v) {
        set.add(deepClone(v, stack));
      });
      return set;
    }

    if (Array.isArray(value)) {
      var arr = [];
      stack.set(value, arr);
      for (var i = 0; i < value.length; i++) {
        arr[i] = deepClone(value[i], stack);
      }
      return arr;
    }

    var obj = Object.create(Object.getPrototypeOf(value));
    stack.set(value, obj);
    var keys = Object.keys(value);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      obj[key] = deepClone(value[key], stack);
    }
    return obj;
  }

  function merge(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (!isObject(src)) continue;
      var sKeys = Object.keys(src);
      for (var j = 0; j < sKeys.length; j++) {
        var k = sKeys[j];
        target[k] = src[k];
      }
    }
    return target;
  }

  function deepMerge(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (!isObject(src)) continue;
      var sKeys = Object.keys(src);
      for (var j = 0; j < sKeys.length; j++) {
        var key = sKeys[j];
        var sv = src[key];
        var tv = target[key];
        if (isPlainObject(sv) && isPlainObject(tv)) {
          target[key] = deepMerge({}, tv, sv);
        } else {
          target[key] = deepClone(sv);
        }
      }
    }
    return target;
  }

  var dataUtil = {
    isObject: isObject,
    isPlainObject: isPlainObject,
    deepClone: deepClone,
    merge: merge,
    deepMerge: deepMerge
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataUtil;
  }
  if (typeof global !== 'undefined') {
    global.dataUtil = dataUtil;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
