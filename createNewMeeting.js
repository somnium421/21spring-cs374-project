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
}).on("changeDate", function(e) {
    console.log(e.dates);
    console.log($("#start-time").val(), e.dates[e.dates.length-1])
    $("#start-time").val("");
});;


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
   
    if((day) > 0){
        $('#hour').attr('disabled','disabled');
        $('#min').attr('disabled','disabled');
        $('#available-time').hide();
    }
    else if((hour) > 0){
        $('#day').attr('disabled','disabled');
        $('#available-time').show();
    }
    else if((min) > 0){
        $('#day').attr('disabled','disabled');
        $('#available-time').show();
    }
    else{
        $('#day').removeAttr('disabled');
        $('#hour').removeAttr('disabled');
        $('#min').removeAttr('disabled');
        $('#available-time').show();
    }
});


mobiscroll.setOptions({
    locale: mobiscroll.localeEn,  // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'windows',            // More info about themeVariant: https://docs.mobiscroll.com/5-4-0/javascript/datetime#opt-themeVariant
});

console.log(mobiscroll);

$('#start-time').mobiscroll().datepicker({
    controls: ['time'],
    select: 'range',
    showRangeLabels: true,
    stepMinute: 60,
    timeFormat: "hh:00 A"
});