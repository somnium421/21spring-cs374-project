
$(document).ready(()=>{
    $("g#brandingLogo").remove();
})


// JS 
var chart, 
chartConfig = { 
    debug: true, 
    //Without data, a view must be specified. 
    type: 'calendar month solid', 
    title_label_text: '6', 
    yAxis_visible: false, 
    legend: { 
    //Add custom entries 
    template: '%icon %name', 
    position: 'bottom', 
    customEntries: [ 
        { 
        name: 'Available', 
        icon_color: '#cbf2b7'
        }, 
        { 
        name: 'Booked', 
        icon: { 
            hatch: { 
            style: 'light-upward-diagonal', 
            color: '#a2a2a2'
            } 
        } 
        } 
    ] 
    }, 
    calendar: { 
    range: ['1/1/2018', '1/31/2018'], 
    defaultEdgePoint: { 
        mouseTracking: false, 
        label_visible: false
    } 
    }, 
    defaultSeries: { 
    opacity: 0.6, 
    legendEntry_visible: false, 
    defaultPoint: { 
        outline_width: 0, 
        label_text: '<b>%name</b>'
    } 
    }, 
    toolbar_visible: false
};

makeChart(["1/1/2018,a", "1/2/2018,a"]);


function makeChart(data) { 
    chartConfig.series = [ 
      { 
        points: data.map(function(row) { 
          var isAvailable = row[1] === 'a'; 
          return isAvailable 
            ? { 
                date: row[0], 
                color: '#cbf2b7', 
                tooltip: 
                  '{%date:date d}<hr><b>Available</b>'
              } 
            : { 
                date: row[0], 
                tooltip: 
                  '{%date:date d}<hr><b>Booked</b>', 
                hatch: { 
                  style: 'light-upward-diagonal', 
                  color: '#a2a2a2'
                } 
              }; 
        }) 
      } 
    ]; 
    chart = JSC.chart('chartDiv', chartConfig); 
    chart.load(function() {
        $("g#brandingLogo").remove();
    })
    
  } 



function find(newArrDates, date){
    for (let i = 0; i< newArrDates.length; i ++) {
        if (date.toLocaleString() === newArrDates[i].toLocaleString()) {
            return false
        }
    } 
    return true;
}

function setDateDisabled(arrDates){
    arrDates.sort();

    newArrDates = arrDates.map(({seconds}) => {
        const millis = seconds * 1000;
        return new Date(millis);
        // const len = dataObject.toLocaleString().length
        // return dataObject.toLocaleString().slice(0,len-12);
    })

    var arrDatesDisabled = [];
    var arrLen = newArrDates.length
    var srt_Date = newArrDates[0].toLocaleString().slice(0,newArrDates[0].toLocaleString().length-12);
    var end_Date = newArrDates[arrLen-1].toLocaleString().slice(0,newArrDates[arrLen-1].toLocaleString().length-12);
    
    let date = new Date(newArrDates[0]);

    const len = newArrDates.length;

    while (date < newArrDates[len-1]){

        date.setDate(date.getDate() + 1);
        // console.log(date.toLocaleString());

        if (find(newArrDates, date)){
            var strLen = date.toLocaleString().length;
            arrDatesDisabled.push(date.toLocaleString().slice(0,strLen-12));
        } 
    }

    
    // $.fn.datepicker.defaults.startDate = srt_Date;
    // $("#availableTime").datepicker('setDates', newArrDates);
    $("#availableTime").datepicker({
        format: 'yyyy. m. d.',
        inline: false,
        lang: 'en',
        step: 10,
        multidate: true,
        closeOnDateSelect: true,
        todayHighlight: false,
        startDate: srt_Date,
        endDate: end_Date,
        datesDisabled: arrDatesDisabled,
        daysOfWeekHighlighted : [3],
    })
    .on("changeDate", function(e) {
        e.dates = newArrDates;
        console.log(e);
        // $("#availableTime").datepicker('setDates', newArrDates)
        // userAvailableDates = e.dates;
    })
   
}


$('td[data-date="1624147200000"]').css("background-color", "#222!important");

