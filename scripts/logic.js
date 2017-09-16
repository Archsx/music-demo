var beginOrContinueInput = true;
var resetInputAsFocusForTheFirstTimeState = true;
var result;
var historyObject = {}

var request = (function () {
    var intv;
    var promise = Promise.resolve()
    return function (value, delay) {
        if (intv) {
            clearTimeout(intv)
        }
        intv = setTimeout(function () {
            intv = null;
            promise = promise.then(function () {
                return new Promise(function (resolve, reject) {
                    var queryName = new AV.Query('Song');
                    queryName.contains('name', value);
                    var querySinger = new AV.Query('Song');
                    querySinger.contains('singer', value);
                    var query = AV.Query.or(queryName, querySinger)
                    query.find().then(function (songs) {
                        $('.searchTip').empty();
                        result = songs;
                        if (songs.length === 0) {
                            $('.searchTip').html('')
                        } else {
                            songs.map(function (song) {
                                let songInfo = song.attributes;
                                let li = `
                            <li  data-id="${song.id}" class="uppercase">
                                        <a href="./song.html?id=${song.id}">
                                        <svg class="icon">
                                            <use xlink:href="#icon-search"></use>
                                        </svg>
                                        <div class="searchResult">
                                            ${songInfo.name} ${songInfo.singer}
                                        </div>
                                        </a>
                                    </li>
                            `
                                $('.searchTip').append(li)

                            })
                        }
                        resolve();
                    })
                })
            })
        }, delay * 1000)
    }
})()
// var request = (function () {
//     var intv;
//     var promise = Promise.resolve()
//     return function (value, delay) {
//         var songNameQuery = new AV.Query('Song');
//         songNameQuery.contains('name', value);
//         if (intv) {
//             clearTimeout(intv)
//         }
//         intv = setTimeout(function () {
//             intv = null;
//             promise = promise.then(function () {
//                 return songNameQuery.find().then(function (songs) {
//                     songs.map(function (song) {
//                         console.log(song.attributes)
//                     })
//                 }, function (err) {
//                     console.log(err)
//                 })
//             })
//         }, delay * 1000)
//     }
// })()

function isNullCharacter() {
    var value = $('input#query').val();
    return value === "" ? true : false;
}

function reset() {
    $("svg.clear").removeClass('show').addClass('hide')
    $("label.holder").removeClass('hide').addClass('show')
}

function inputing() {
    $("svg.clear").removeClass("hide").addClass('show')
    $("label.holder").removeClass('show').addClass('hide')
}

function showSearchResultPageN(n) {
    $('.aboutSearch>ul>li').eq(n).removeClass('hide').addClass('show').siblings('.show').removeClass('show').addClass('hide')
}

$('.tabs>ul').on('click', 'li', function (e) {
    let li = $(e.currentTarget);
    let index = li.index();
    li.addClass('active').siblings('.active').removeClass('active');
    $('.tab-contents>ol>li').eq(index).addClass('active').siblings('.active').removeClass('active');
    if (index == 2 && isNullCharacter()) {
        showSearchResultPageN(0)
        $('input#query').focus()
    }
})

$('input#query').on('focus', function (e) {
    if (resetInputAsFocusForTheFirstTimeState) {
        reset()
        resetInputAsFocusForTheFirstTimeState = false;
    }
})

$('input#query').on('input', function (e) {
    showSearchResultPageN(1)
    if (beginOrContinueInput) {
        inputing()
        beginOrContinueInput = false;
    }
    if (isNullCharacter()) {
        showSearchResultPageN(0)
        reset()
        beginOrContinueInput = true;
    }
    var $input = $(e.currentTarget)
    var value = $input.val()
    if (value.trim() === '') {
        $('.inputValue').html('')
        $('.searchTip').empty();
        return;
    } else {
        $('.inputValue').html(`搜索"${value}"`)
        request(value, 0.4)
    }
    // let $input = $(this);
})

$('input#query').on('blur', function () {
    beginOrContinueInput = true;
})

$('svg.clear').on('click', function (e) {
    showSearchResultPageN(0)
    $('input#query').val('')
    resetInputAsFocusForTheFirstTimeState = true;
    $('input#query').focus();
})
$('.searchTip').on('click', 'li', function (e) {
    let index = $(e.currentTarget).index();
    e.preventDefault();
    showSearchResultPageN(2)
    // console.log(result[index])
    $('.searchResultDetail ol').empty();
    let li = `
                    <li>
                        <a href="./song.html?id=${result[index].id}">
                                <div class="songInfo">
                                    <div class="songName">
                                        <p>${result[index].attributes.name}</p>
                                    </div>
                                    <div class="singer">
                                        ${result[index].attributes.singer}-${result[index].attributes.album}
                                    </div>
                                </div>
                                <div class="play">
                                    <svg class="icon">
                                        <use xlink:href="#icon-play"></use>
                                    </svg>
                                </div>
                        </a>
                    </li>
    `
    $('.searchResultDetail ol').append(li);
    let liSQ = `
                        <svg class="icon">
                            <use xlink:href="#icon-SQ"></use>
                        </svg>
         `;
    if (result[index].attributes.highquality) {
        $('.searchResultDetail li').find('.singer').prepend(liSQ)
    }
    $('input#query').val($(e.currentTarget).find('.searchResult').text().trim())
    historyObject[$('input#query').val()] = {
        haveSearched:true,
        info:result[index]
    };
initializeHistoryObject()
})
function initializeHistoryObject(){
    $('.hotAndHistory .history').children().remove()
    let keyArray = Object.keys(historyObject).reverse();
    if(keyArray.length>5){
        keyArray = keyArray.slice(0,6)
    }
    keyArray.map(function(ele){
        if(historyObject[ele].haveSearched) {
            let li = `
            <li data='${ele}'>
                <div class="clock">
                    <svg class="icon icon-clock">
                        <use xlink:href="#icon-clock"></use>
                    </svg>
                </div>
                <div class="searchHistoryContent">
                    <span>${ele}</span>
                        <div class="close">
                            <svg class="icon icon-close" data='${ele}'>
                                 <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                </div>
            </li>
            `
        $('.hotAndHistory .history').append(li)
        }       
    })
}

$('.hotAndHistory .history').on('click','.icon-close',function(e){
    e.stopPropagation()
    let key = $(e.currentTarget).attr('data')
    historyObject[key].haveSearched = false;
    $(e.currentTarget).parent().parent().parent().remove()
})
$('.hotAndHistory .history ').on('click', 'li',function(e){
    let key = $(e.currentTarget).attr('data')
    let songInfo = historyObject[key].info
    showSearchResultPageN(2)
    $('.searchResultDetail ol').empty();
    let li = `
                    <li>
                        <a href="./song.html?id=${songInfo.id}">
                                <div class="songInfo">
                                    <div class="songName">
                                        <p>${songInfo.attributes.name}</p>
                                    </div>
                                    <div class="singer">
                                        ${songInfo.attributes.singer}-${songInfo.attributes.album}
                                    </div>
                                </div>
                                <div class="play">
                                    <svg class="icon">
                                        <use xlink:href="#icon-play"></use>
                                    </svg>
                                </div>
                        </a>
                    </li>
    `
    $('.searchResultDetail ol').append(li);
    let liSQ = `
                        <svg class="icon">
                            <use xlink:href="#icon-SQ"></use>
                        </svg>
         `;
    if (songInfo.attributes.highquality) {
        $('.searchResultDetail li').find('.singer').prepend(liSQ)
    }

})
// $('body').on('click',function(e){
//     console.log(e.target)
// })