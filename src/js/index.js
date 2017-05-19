var $ = window.Zepto,
    $scope = $(document.body),
    root = window.player,
    dataUrl = '/mock/data.json',
    render = root.render,//=function (){renderImg()}
    songList,
    controlManage,
    playList = root.playList,
    audioManage = new root.AudioManage(),
    process = root.process;
//绑定touch事件
function bindTouch() {
    var $slidePoint = $scope.find('.slider-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on('touchstart', function() {
        process.stop();
    }).on('touchmove', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0 || per > 1) {
            per = 0
        }
        process.update(per);
    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        var index = controlManage.index;
        var curIndex = songList[index];
        var curtime = curIndex.duration;
        var percentage = per * curtime;
        audioManage.jumpToPlay(percentage);
        process.start(per);
        $scope.find('.play-btn').addClass('playing');
        audioManage.status = 'play';   
    })
}
$scope.on('play:change', function(event, index, flag) {
    var curData = songList[index];
    render(curData);
    playList.signSong(controlManage.index);
    audioManage.setAudioSource(curData.audio);
    process.render(curData.duration);
    if(audioManage.status === 'play' || flag) {
        audioManage.play();
        process.start();
    }
    process.update(0);       
     
});
$scope.on('click', '.prev-btn', function() {
    var newIndex = controlManage.prev();
    $scope.trigger('play:change', newIndex);
})
$scope.on('click', '.next-btn', function() {
    var newIndex = controlManage.next();
    $scope.trigger('play:change', newIndex);
})
$scope.on('click', '.play-btn', function() {
    if(audioManage.status === 'play') {
        audioManage.pause();
        process.stop();
    }else{
        audioManage.play();
        process.start();
    }
    $(this).toggleClass('playing');
})
$scope.on('click', '.list-btn', function() {
    playList.show(controlManage);
})
function successCallback(data) {
    bindTouch();
    playList.render(data);
    controlManage = new root.ControlManage(0, data.length);
    songList = data;
    $scope.trigger('play:change', 0);
}
function getData(url, callback) {
    $.ajax({
        type:'GET',
        url:url,
        success:callback,
        error:function() {
            console.log('error');
        }
    })
}
getData(dataUrl, successCallback);