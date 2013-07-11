var EZ = EZ || {};

/**
 * EZ utilities.
 * 
 * @class EZ.util
 * @static
 */
EZ.util = {
    /**
     * Executes an Array.forEach on an array-like object.
     * 
     * @param {Object} array
     * @param {Function} fn
     * @returns {Array}
     */
    forEach: function (array, fn) {
        return Array.prototype.slice.call(array).forEach(fn);
    },
    /**
     * Executes an Array.forEach on an array-like object.
     * 
     * @param {Object} array
     * @param {Function} fn
     * @returns {Array}
     */
    filter: function (array, fn) {
        return Array.prototype.slice.call(array).filter(fn);
    },
    /**
     * Tells if the node has a class.
     * 
     * @param {Node} node
     * @param {String} cls
     * @returns {Boolean}
     */
    hasClass: function (node, cls) {
        return (" " + node.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + cls +  " ") > -1;
    },
    /**
     * Adds a class to this node.
     * 
     * @param {Node} node
     * @param {String} cls
     */
    addClass: function (node, cls) {
       if (!EZ.util.hasClass(node, cls)) {
           if (!node.className) {
               node.className = cls;
           } else {
               node.className += ' ' + cls;
           }
       } 
    },
    /**
     * Removes a class from this node.
     * 
     * @param {Node} node
     * @param {String} cls
     */
    removeClass: function (node, cls) {
        node.className = node.
                className.
                replace(/[\n\t]/g, " ").
                split(' ').filter(function (current) {
                    return current !== cls;
                }).join(' ');
    },
    /**
     * Makes an ajax request.
     * 
     * @param {Object} options
     */
    ajax: function (options) {
        var xhr = new XMLHttpRequest();
        
        xhr.open("GET", options.url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    options.success(xhr.responseText);
                } else {
                    options.failure(xhr);
                }
            }
        };
        
        xhr.send();
        
        return xhr;
    },
    /**
     * Returns the first parent that has a class including the source.
     * 
     * @param {Element} node
     * @param {String} cls
     * 
     * @returns {Element}
     */
    getClosestElementWithClass: function (node, cls) {
        do {
            if (EZ.util.hasClass(node, cls)) {
                return node;
            }
            node = node.parentNode;
        } while (node);
        
        return null;
    },
    /**
     * Returns the absolute position of an element.
     * 
     * @param {Element} element
     * 
     * @returns {Object}
     */
    getPosition: function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    },
    /**
     * Executes a function once when the DOM is ready to be manipulated.
     * 
     * @param {Function} fn
     * 
     */
    onReady: function (fn) {
        var wrapper = function () {
            fn();
            document.removeEventListener('DOMContentLoaded', wrapper);
        };
        
        document.addEventListener('DOMContentLoaded', wrapper);
    }
};