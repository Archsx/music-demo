function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function parseLyric(lyric) {
    // var lrc = lyric.split('\n');
    var lrc = lyric.match(/^[\S ]*/mg);
    var length = lrc.length;
    var lrcObj = {};
    var timeReg = /\[\d*:\d*.\d*\]/g
    for (var i = 0; i < length; i++) {
        let timeArr = lrc[i].match(timeReg)
        if (!timeArr) {
            continue
        }
        timeArr = timeArr[0].match(/\d*:\d*.\d*/)
        let clause = lrc[i].replace(timeReg, '')
        let min = parseInt(timeArr[0].split(':')[0])
        let sec = parseInt(timeArr[0].split(':')[1].split(".")[0])
        let time = min * 60 + sec;
        if (clause) {
            lrcObj[time] = clause;
        }
    }
    for (let key of Object.keys(lrcObj)) {
        let li = `
                    <p>${lrcObj[key]}</p>
                `
        $('.lyricScroll').append(li)
    }
    return lrcObj;
}
(function () {
    var id = getParameterByName('id')
    var query = new AV.Query('Song')
    var lrcObj;
    query.get(id).then(function (song) {
        // let {url,lyric} = song.attributes;
        var url = song.attributes.url;
        var lyric = song.attributes.lyric
        var coverImgURL = song.attributes.cover;
        var name = song.attributes.name;
        var singer = song.attributes.singer;
        let li = `
             <h2>
                <span>${name}</span>
                <span class="mid">-</span>
                <b>${singer}</b>
            </h2>
        `
        $('.lyric').prepend(li)
        $(`<style>.page::before { background:url(${coverImgURL}) no-repeat center;background-size:auto 100% }</style>`).appendTo("head")
        var img = document.createElement('img')
        img.src = coverImgURL;
        document.querySelector('.circle').appendChild(img)
        $(img).attr('class', 'cover')
        lrcObj = parseLyric(lyric)
        var height = $('.lyricScroll p').height() + 8;
        var video = document.createElement('video')
        video.src = url;
        document.head.appendChild(video)
        $('video')[0].addEventListener('ended', function (e) {
            $('.circle').removeClass('playing')
            $('svg.play').removeClass('hide').addClass('show');
            $('.lyricScroll').css({
                transform: 'translateY(0)'
            })
        })
        $('video')[0].addEventListener('timeupdate', function (e) {
            var crtTime = parseInt($('video')[0].currentTime);
            if (lrcObj[crtTime]) {
                let index = Object.keys(lrcObj).indexOf(crtTime.toString()) - 1;
                index = index < 0 ? 0 : index;
                $('.lyricScroll').css({
                    transform: 'translateY(' + (-height * index) + 'px)'
                })
                $('.lyricScroll p').eq(index + 1).addClass('highLight').siblings('.highLight').removeClass('highLight')
            }
        })
    })
})()
$('svg.play').on('click', function (e) {
    $('video')[0].play()
    $('.circle').removeClass('pause').addClass('playing')
    $('svg.play').addClass('hide')
})
// $('img.cover').on('click', function (e) {
//     $('video')[0].pause();
//     $('svg.play').removeClass('hide').addClass('show');
//     $('.circle').addClass('pause')

// })
$('.circle').on('click', 'img.cover', function (e) {
    $('video')[0].pause();
    $('svg.play').removeClass('hide').addClass('show');
    $('.circle').addClass('pause')

})
// $('body').on('click',function(e){
//     console.log(e.target)
// })