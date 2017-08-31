var beginOrContinueInput = true;
var resetInputAsFocusForTheFirstTimeState = true;
 
function isNullCharacter(){
    var value = $('input#query').val();
    return value === "" ? true : false; 
 }
function reset(){
    $("svg.clear").removeClass('show').addClass('hide')
    $("label.holder").removeClass('hide').addClass('show')
}
function inputing(){
     $("svg.clear").removeClass("hide").addClass('show')
     $("label.holder").removeClass('show').addClass('hide')
}
$('input#query').on('focus',function(e){
    if(resetInputAsFocusForTheFirstTimeState){
    reset()
    resetInputAsFocusForTheFirstTimeState = false;
    }
})
$('input#query').on('input',function(e){
    if(beginOrContinueInput){
     inputing()
     beginOrContinueInput = false;
    }
    if(isNullCharacter()){
        reset()
        beginOrContinueInput = true;
    }
     let $input = $(e.currentTarget)
    // let $input = $(this);
    let value = $input.val()
})
$('input#query').on('blur',function(){
     beginOrContinueInput = true;
})
$('svg.clear').on('click',function(e){
    $('input#query').val('')
    resetInputAsFocusForTheFirstTimeState = true;
    $('input#query').focus();
})
