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

function toggle(target) {
    if (target.data('selected')) {
        target.removeClass('btn-primary');      
        target.addClass('btn-outline-primary');  
    }
    else {
        target.removeClass('btn-outline-primary');
        target.addClass('btn-primary');
    }
    target.data('selected', !target.data('selected'));
    return !target.data('selected');
}

$('#location-add').click(function(event) {
    console.log('hello');
    if (toggle($(event.target))) $('#location-input').addClass('d-none');
    else $('#location-input').removeClass('d-none');
});

$('#location-add-tag').click(function() {
    if ($('#location-input-text').val() != '') {
        $('#location-add').before(`<button type="button" class="btn btn-primary rounded-pill me-2 selectable" data-selected=true>${$('#location-input-text').val()}</button>`);
        $('#location-input-text').val('');
    }
});

$('#activity-add').click(function(event) {
    console.log('hello');
    if (toggle($(event.target))) $('#activity-input').addClass('d-none');
    else $('#activity-input').removeClass('d-none');
});

$('#activity-add-tag').click(function() {
    if ($('#activity-input-text').val() != '') {
        $('#activity-add').before(`<button type="button" class="btn btn-primary rounded-pill me-2 selectable" data-selected=true>${$('#activity-input-text').val()}</button>`);
        $('#activity-input-text').val('');
    }
});

$('.selectable').click(function(event) {
    toggle($(event.target));
});

var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    zoom: 15
});

var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
});
  
function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({query: address}, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            if (!address) return alert('Geocode Error, Please check address');
            return alert('Geocode Error, address:' + address);
        }
        if (response.v2.meta.totalCount === 0) return alert('No result.');
        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);
        if (item.roadAddress) htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));
        map.setCenter(point);
        infoWindow.open(map, point);
    });
}