(function($, root) {
    var $playList = $('<div class="play-list">' +
                        '<div class="head">播放列表</div><ul class="play-list-wrapper"></ul>' +
                        '<div class="close-btn">关闭</div>' + '</div>');
    var $scope = $(document.body);
    var controlManage;
    function render(data) {
        var html = '';
        var len = data.length;
        for(var i = 0; i < len; i ++) {
            html += '<li><h3>' + data[i].song + '-<span>' + data[i].singer +'</span></h3></li>'
        }
        $playList.find('.play-list-wrapper').html(html);
        $scope.append($playList);
        bindEvent();        
    }
    function bindEvent() {
        $playList.find('.close-btn').on('click', function() {
            $playList.removeClass('show');
        });
        $playList.find('ul li').on('click', function() {
            var index = $(this).index();
            controlManage.index = index;
            $scope.trigger('play:change', [index, true]);
            $scope.find('.play-btn').addClass('playing');
            signSong(index);
            setTimeout(function() {
                $playList.removeClass('show')
            }, 500)
        })
    }
    //显示当前播放的歌曲
    function signSong(index) {
        $playList.find('li').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    //显示播放列表
    function show(control) {
        controlManage = control;
        var index = controlManage.index;
        signSong(index);
        $playList.addClass('show');
    }
    root.playList = {
        render:render,
        show : show,
        signSong: signSong
    }
})(window.Zepto, window.player || (window.player = {}))