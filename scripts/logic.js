var beginOrContinueInput = true;
var resetInputAsFocusForTheFirstTimeState = true;

var request = (function(){
    var intv;
    var promise = Promise.resolve()
    return function(value,n){
       if(intv){
           clearTimeout(intv)
       }
       intv =  setTimeout(function(){
         intv = null;
            promise = promise.then(function(){
                return new Promise(function(resolve,reject){
                    var query = new AV.Query('Song');
                    query.contains('name',value);
                    query.find().then(function(songs){
                        songs.map(function(song){
                            console.log(song.attributes)
                        })
                        resolve();
                    })
                })
            })
       },n*1000)
    }
})()
// var request = (function () {
//     var intv;
//     var promise = Promise.resolve()
//     return function (value, n) {
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
//         }, n * 1000)
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