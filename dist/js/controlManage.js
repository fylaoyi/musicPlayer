//管理index
(function($, root) {
    var ControlManage = function(index, length) {
        this.index = index;
        this.length = length;
    }
    ControlManage.prototype = {
        prev : function() {
            return this.setIndex(-1);
        },
        next : function() {
            return this.setIndex(1);
        },
        setIndex : function(val) {
            var index = this.index;
            var len = this.length;
            var curIndex = (index + len + val) % len;//处理边际值问题
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlManage = ControlManage;
})(window.Zepto, window.player || (window.player={}))