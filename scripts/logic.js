var hide = true;
function isNullCharacter(){
    var value = $('input#query').val();
    return value === "" ? true : false; 
 }
$('input#query').on('focus',function(e){
    $("svg.clear").removeClass('show').addClass('hide')
    $("label.holder").removeClass('hide').addClass('show')
})
$('input#query').on('input',function(e){
    if(hide || isNullCharacter()){
     $("svg.clear").removeClass('hide').addClass('show')
     $("label.holder").removeClass('hide').addClass('hide')
     hide = false;
    }
     let $input = $(e.currentTarget)
    // let $input = $(this);
    let value = $input.val()
})
$('svg.clear').on('click',function(e){
    $('input#query').val('')
    $('input#query').focus();
    hide = true;
})