(function($, root) {
    $scope = $(document.body);
    var start;
    var curDuration;
    var frameId;
    var lastPercentage = 0;
    function formate(time){
        time = Math.round(time);
		var minute = Math.floor(time / 60);
		var second = time - minute * 60;
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

//渲染歌曲总时间
    function render(duration) {
        lastPercentage = 0;
        curDuration = duration;               
        var allTime = formate(duration);
        $scope.find('.all-time').text(allTime);
    }
    //渲染当前时间
    function update(percentage) {
        var curTime = percentage * curDuration;
        var time = formate(curTime);
        $scope.find('.current-time').text(time);
        setProcess(percentage);
    }
    //渲染进度条
    function setProcess(percentage) {
        var percent = (percentage - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            'transform' : 'translateX(' + percent + ')'
         })
    }
    //渲染当前时间
    function start(percent) {
        lastPercentage = percent === undefined ? lastPercentage : percent
        cancelAnimationFrame(frameId);
        start = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percentage = lastPercentage + (curTime - start) / (curDuration * 1000);
            if(percentage < 1) {
                update(percentage);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stop() {
        var curTime = new Date().getTime();
        var percentage = (curTime - start) / (curDuration * 1000);
        lastPercentage = percentage + lastPercentage;
        update(lastPercentage);
        cancelAnimationFrame(frameId);
    }
    root.process = {
        render:render,
        start : start,
        stop : stop,
        update : update
    }
})(window.Zepto, window.player || (window.player = {}))