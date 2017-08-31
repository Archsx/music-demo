var beginOrContinueInput = true;
var resetInputAsFocusForTheFirstTimeState = true;

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

$('.tabs>ul').on('click', 'li', function (e) {
    let li = $(e.currentTarget);
    let index = li.index();
    li.addClass('active').siblings('.active').removeClass('active');
    $('.tab-contents>ol>li').eq(index).addClass('active').siblings('.active').removeClass('active');
    if (index == 2 && isNullCharacter()) {
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
    if (beginOrContinueInput) {
        inputing()
        beginOrContinueInput = false;
    }
    if (isNullCharacter()) {
        reset()
        beginOrContinueInput = true;
    }
    let $input = $(e.currentTarget)
    // let $input = $(this);
    let value = $input.val()
})

$('input#query').on('blur', function () {
    beginOrContinueInput = true;
})

$('svg.clear').on('click', function (e) {
    $('input#query').val('')
    resetInputAsFocusForTheFirstTimeState = true;
    $('input#query').focus();
})