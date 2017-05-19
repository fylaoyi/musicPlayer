(function($, root) {
    var $scope = $(document.body);
    //渲染歌曲信息
    function renderInfo(info) {
        var content =  '<h1 class="song-name">' + info.song + '</h1>' +
                        '<h3 class="singer-name">' + info.singer  + '</h3>' +
                        '<h3 class="album-name">' + info.album + '</h3>';
        $scope.find('.song-info').html(content);
    }
    //渲染图片及高斯模糊
    function renderImage(src) {
        var image = new Image();
        image.onload = function() {
            $scope.find('.song-img img').attr('src', src);
            root.blurImg(image, $scope);
        }
        image.src = src;        
    }
    function renderLikeBtn(islike) {
        if(islike) {
            $scope.find('.like-btn').addClass('liked');
        }else{
            $scope.find('.like-btn').removeClass('liked');
        }
    }
    root.render = function(data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
}(window.Zepto, window.player||(window.player={})))
        //$       root