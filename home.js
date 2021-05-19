$(document).ready(function () {
    $('head').append('<style type="text/css"> #meeting-list {height: ' + ($('.card-body').height()) + 'px;}</style>');

    if ($('.meeting-card').css("display") === "none") $('.meeting-card').show();
});