//播放模块
(function($, root) {
    var $scope = $(document.body);
    var AudioManage = function() {
        this.audio = new Audio();
        this.status = 'pause';
        this.bindEvent();
    }
    AudioManage.prototype = {
        bindEvent : function() {
            $(this.audio).on('ended', function() {
                $scope.find('.next-btn').trigger('click');
            })
        },
        play : function() {
            this.audio.play();
            this.status = 'play';
        },
        pause : function() {
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSource : function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function(time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.AudioManage = AudioManage;
})(window.Zepto, window.player || (window.player = {}))