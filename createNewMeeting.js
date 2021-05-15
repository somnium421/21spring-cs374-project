//This is for new meeting creation page

console.log("hello world")

$("#Txt_Date").datepicker({
    format: 'd-M-yyyy',
    inline: false,
    lang: 'en',
    step: 10,
    multidate: true,
    closeOnDateSelect: true,
    todayHighlight: false
});

var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');

    allWells.hide();

navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
        $item = $(this);

    if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-light').addClass('btn-primary');
        $item.addClass('btn-light');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
    }
});

allPrevBtn.click(function(){
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        prevStepSteps.removeAttr('disabled').trigger('click');
});

allNextBtn.click(function(){
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;

    $(".form-group").removeClass("has-error");
    for(var i=0; i< curInputs.length; i++){
        if (!curInputs[i].validity.valid){
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
    }

    if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
});

$('div.setup-panel div a.btn-light').trigger('click');


//일, 시간, 분 input 고르기
$('.timefield').removeAttr('disabled');
   
$('.timefield').change(function(){
   
    var day = $('#day').val();
    var hour = $('#hour').val();
    var min = $('#min').val();

    var textForDays = `<small id="periodHelp" class="form-text text-muted">${Number(day)-1}박 ${Number(day)}일 동안 모임을 진행합니다.</small>`
    var textForADay = `<small id="periodHelp" class="form-text text-muted">하루종일 모임을 진행합니다.</small>`
    var text;

    if((day) > 0){
        $('#hour').attr('disabled','disabled');
        $('#min').attr('disabled','disabled');
        if (day === "1") {
            text = textForADay;
        }else {
            text = textForDays;
        }
        
        if ($("#periodHelp").length === 0) $("#period-select").append(text);
        else $("#periodHelp").replaceWith(text);
    }

    else if((hour) > 0){
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').attr('disabled','disabled');
    }
    else if((min) > 0){
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').attr('disabled','disabled');
    }
    else{
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').removeAttr('disabled');
        $('#hour').removeAttr('disabled');
        $('#min').removeAttr('disabled');
    }
});