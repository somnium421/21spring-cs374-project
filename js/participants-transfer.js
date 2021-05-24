
var groupDataArray1 ;


var participants_transfer


// window.nchart = [
//     { id: 0, tags: ["blue"], partner: 1, name: "정창식", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg"},
//     { id: 1, pid: 0, tags: ["partner"], partner: 0, name: "김영구", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 2, pid: 0, ppid: 1, tags: ["default"], partner: 3, name: "정경택", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 3, pid: 2, tags: ["partner"], partner: 2, name: "김효인", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 4, pid: 0, ppid: 1, tags: ["default"], partner: 5, name: "정미영", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 5, pid: 4, tags: ["partner"], partner: 4, name: "김종욱", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 6, pid: 0, ppid: 1, tags: ["default"], partner: 7, name: "정경남", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 7, pid: 6, tags: ["partner"], partner: 6, name: "양창수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 8, pid: 0, ppid: 1, tags: ["default"], partner: 9, name: "정혜경", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 9, pid: 8, tags: ["partner"], partner: 8, name: "박종두", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 10, pid: 2, ppid: 3, tags: ["default"], name: "정지은", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 11, pid: 2, ppid: 3, tags: ["default"], name: "정지우", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 12, pid: 2, ppid: 3, tags: ["default"], name: "정우성", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 13, pid: 4, ppid: 5, tags: ["default"], name: "김솔", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 14, pid: 4, ppid: 5, tags: ["default"], name: "김민태", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 15, pid: 6, ppid: 7, tags: ["default"], name: "양선", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 16, pid: 6, ppid: 7, tags: ["default"], name: "양은혜", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 17, pid: 6, ppid: 7, tags: ["default"], name: "양한나", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 18, pid: 8, ppid: 9, tags: ["default"], name: "박준수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 19, pid: 8, ppid: 9, tags: ["default"], name: "박승수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 20, pid: 8, ppid: 9, tags: ["default"], name: "박혜수", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
// ];



function families(chart, finalChart) {
    
    var family =[];
    var gpid;
    var gndfamilyGroup = {};
    
    for (i = 0; i < chart.length; i ++){
        if (chart[i].pid === undefined) {
            
            gpid = chart[i].id;
            
            if (finalChart[i].title !== '나' 
                && finalChart[i].title !== '남편'
                && finalChart[i].title !== '아내') gndfamilyGroup.name = finalChart[i].title + " " + finalChart[chart[i].partner].title ;
            else gndfamilyGroup.name = "우리 부부";
            gndfamilyGroup.data = [chart[i]]

        }
    }
    console.log(chart.filter(({id}) => id === gpid)[0].partner)
    for (i = 0; i < chart.length; i ++){
        pp = chart[i].ppid;
        if (pp){
            if (pp === gpid || pp === chart.filter(({id}) => id === gpid)[0].partner){
                var familyGroup = {};
                var parent = [];
                parent.push(chart[i]);
                if (chart[i].partner) parent.push( chart.filter( ({id}) => id === chart[i].partner )[0]);
                
                if (finalChart[i].title !== '나' 
                        && finalChart[i].title !=='어머니' 
                        && finalChart[i].title !=='아버지' 
                        && finalChart[i].title !=='아들'
                        && finalChart[i].title !== '딸'
                        && finalChart[i].title !== '아내'
                        && finalChart[i].title !== '남편'
                        && finalChart[i].title ) familyGroup.name = `${finalChart[i].title}네 가족`;
                else if (finalChart[i].title === "" 
                        || finalChart[i].title === '딸' 
                        || finalChart[i].title === '아들' ) familyGroup.name = `${chart[i].name}의 가족`
                else if (finalChart[i].title === '나' 
                        || finalChart[i].title ==='어머니' 
                        || finalChart[i].title ==='아버지'
                        || finalChart[i].title !== '아내'
                        || finalChart[i].title !== '남편') familyGroup.name = "우리 가족";
                familyGroup.data = parent;

                family.push(familyGroup);
            }  
        }
    }
     for (i = 0; i < chart.length; i ++){
        if (chart[i].partner === gpid) gndfamilyGroup.data.push(chart[i])
        pp = chart[i].ppid;
        if (pp){
            if (pp !== 0 && pp !== 1){
                family.forEach(({data}) =>{
                    if (pp === data[0].id || pp === data[1].id ) data.push(chart[i]);
                })
            }  
        }
    }
    family.unshift(gndfamilyGroup);
    console.log(family);
    return family
}



function familyObj(dataObj, finalChart){
    var resObj = {};
    resObj.id = dataObj.id;
    var title = finalChart.filter((el) => el.id === dataObj.id)[0].title;
    if (title) resObj.name = `${dataObj.name} <span class='family-title'>${title}</span>`;
    else resObj.name = dataObj.name;
    return resObj;
}


// console.log(familyObj(chart[0], finalChart));



function arrTransfer (familyGroup, finalChart){
    var resArr = [];
    familyGroup.forEach(({name, data})=>{
        var obj = {
            groupName: name,
            groupData: []
        }
        data.forEach((el) => { obj.groupData.push(familyObj(el, finalChart)) })
        resArr.push(obj);
    })
    return resArr;
}




function mypartner(me, chart){
    var ptn = chart[chart[me].partner];
    if (ptn){
        if(ptn.gender == "male"){
            ptn.title = "남편"
        }
        else(
            ptn.title = "아내"
        )
    }
}

function myparent(me, chart){
    console.log(chart, me, pid, ppid)
    if(chart[chart[me].pid].gender == "male"){
        chart[chart[me].pid].title = "아버지";
        chart[chart[me].ppid].title = "어머니";
    }
    else{
        chart[chart[me].pid].title = "어머니";
        chart[chart[me].ppid].title = "아버지";
    }
}

function mychild(chld, chart){
    child = chart[chld];
    if (child.gender == "male"){
        child.title = "아들";
    }
    else{
        child.title = "딸";
    }
}

function mychildpt(chld, chart){
    if (chart[chld].gender == "male"){
        chart[chld].title = "사위";
    }
    else{
        chart[chld].title = "며느리";
    }
}



$(document).ready(function(){
    var fst = [0, 1];
    var snd = [];
    var snd_2 = [];
    var thrd = [];

    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            chart = doc.data().members;
        })

        console.log(chart);

        for (let i = 0; i < chart.length; i++){
            if (chart[i].pid == 0 && chart[i].ppid == 1){
                snd.push(i);
                snd_2.push(chart[i].partner? chart[i].partner: -1);
            }
        }
    
        for (let j = 0; j<snd.length; j++){
            var children = [];
            for (let i = 0; i<chart.length; i++){
                if (chart[i].pid == snd[j] || chart[i].ppid == snd_2[j]){
                    children.push(i);
                }
            }
            thrd.push(children? children: []);
        }
    
        var me = userID; // id 숫자
        chart[me].title = "나";
    
        console.log("fst:" + fst);
        console.log("snd:" + snd);
        console.log("snd2:" + snd_2);
        console.log("thrd:" + thrd);
    
        if (fst.includes(me)){
            mypartner(me, chart);
    
            for (let i = 0; i<snd.length; i++){
                mychild(snd[i], chart);
                mychildpt(snd_2[i], chart);
    
                for (let j = 0; j< thrd[i].length; j++){
                    chart[thrd[i][j]].title = "손주"
                }
            }
        }
        else if (snd.includes(me)){
            mypartner(me, chart);
            myparent(me, chart);
            chldnum = snd.indexOf(me)
            for (let i = 0; i<snd.length; i++){
                if (i == chldnum){
                    for (let j = 0; j< thrd[i].length; j++){
                        mychild(thrd[i][j], chart);
                    }
                }
                else{
                    for (let j = 0; j< thrd[i].length; j++){
                        chart[thrd[i][j]].title = "조카";
                    }
                }
            }
        }
        else if (snd_2.includes(me)){
            mypartner(me, chart);
            var ptn = chart[me].partner
            myparent(ptn, chart);
            chldnum = snd.indexOf(ptn)
            for (let i = 0; i<snd.length; i++){
                if (i == chldnum){
                    for (let j = 0; j< thrd[i].length; j++){
                        mychild(thrd[i][j], chart);
                    }
                }
                else{
                    for (let j = 0; j< thrd[i].length; j++){
                        chart[thrd[i][j]].title = "조카";
                    }
                }
            }
        }
        else{
            var menum = -1;
            for (let i = 0; i< thrd.length; i++){
                if (thrd[i].includes(Number(me))){
                    menum = i;
                }
            }
            console.log(menum);
            var father = (chart[snd[menum]].gender == "male")
            if (father){
                if (chart[0].gender == "male"){
                    chart[0].title = "할아버지";
                    chart[1].title = "할머니";
                }
                else{
                    chart[1].title = "할아버지";
                    chart[0].title = "할머니";
                }
            }
            else{
                if (chart[0].gender == "male"){
                    chart[0].title = "외할아버지";
                    chart[1].title = "외할머니";
                }
                else{
                    chart[1].title = "외할아버지";
                    chart[0].title = "외할머니";
                }
            }
            for (let i = 0; i<snd.length; i++){
                if (i == menum){
                    myparent(me, chart);
                }
                else{
                    if (father){
                        if(chart[snd[i]].gender == "male"){
                            chart[snd[i]].title = "삼촌"
                            chart[snd_2[i]].title = "숙모"
                        }
                        if(chart[snd[i]].gender == "female"){
                            chart[snd[i]].title = "고모"
                            chart[snd_2[i]].title = "고모부"
                        }
                    }
                    else{
                        if(chart[snd[i]].gender == "male"){
                            chart[snd[i]].title = "외삼촌"
                            chart[snd_2[i]].title = "외숙모"
                        }
                        if(chart[snd[i]].gender == "female"){
                            chart[snd[i]].title = "이모"
                            chart[snd_2[i]].title = "이모부"
                        }
                    }
                    for (let j = 0; j< thrd[i].length; j++){
                        chart[thrd[i][j]].title = "사촌";
                    }
                }
            }
        }

        
        var finalChart = chart;
        var familyGroup = families( chart, finalChart);


        groupDataArray1 = arrTransfer(familyGroup, finalChart);



        var settings = {
            groupDataArray: groupDataArray1,
            groupItemName: "groupName",
            groupArrayName: "groupData",
            itemName: "name",
            valueName: "id",
            tabNameText: "가족 구성원 목록",
            rightTabNameText: "참여자로 선택된 구성원",
            searchPlaceholderText: "찾기",
            callable: function (items) {
                console.dir(items)
            }
        };

        participants_transfer = $("#participants-transfer").transfer(settings);



 

    // chart = [
    //     { id: 0, tags: ["blue"], partner: 1, name: "정창식", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg"},
    //     { id: 1, pid: 0, tags: ["partner"], partner: 0, name: "김영구", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 2, pid: 0, ppid: 1, tags: ["default"], partner: 3, name: "정경택", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 3, pid: 2, tags: ["partner"], partner: 2, name: "김효인", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 4, pid: 0, ppid: 1, tags: ["default"], partner: 5, name: "정미영", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 5, pid: 4, tags: ["partner"], partner: 4, name: "김종욱", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 6, pid: 0, ppid: 1, tags: ["default"], partner: 7, name: "정경남", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 7, pid: 6, tags: ["partner"], partner: 6, name: "양창수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 8, pid: 0, ppid: 1, tags: ["default"], partner: 9, name: "정혜경", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 9, pid: 8, tags: ["partner"], partner: 8, name: "박종두", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 10, pid: 2, ppid: 3, tags: ["default"], name: "정지은", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 11, pid: 2, ppid: 3, tags: ["default"], name: "정지우", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 12, pid: 2, ppid: 3, tags: ["default"], name: "정우성", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 13, pid: 4, ppid: 5, tags: ["default"], name: "김솔", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 14, pid: 4, ppid: 5, tags: ["default"], name: "김민태", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 15, pid: 6, ppid: 7, tags: ["default"], name: "양선", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 16, pid: 6, ppid: 7, tags: ["default"], name: "양은혜", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 17, pid: 6, ppid: 7, tags: ["default"], name: "양한나", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 18, pid: 8, ppid: 9, tags: ["default"], name: "박준수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 19, pid: 8, ppid: 9, tags: ["default"], name: "박승수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    //     { id: 20, pid: 8, ppid: 9, tags: ["default"], name: "박혜수", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    // ];

    })



})


