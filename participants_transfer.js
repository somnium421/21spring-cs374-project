

var groupDataArray1 = [
    {
        "groupName": "할아버지 할머니",
        "groupData": [
            {
                "name": "정창식 <span class='family-title'>할아버지</span>",
                "id": 0
            },
            {
                "name": "김영구 <span class='family-title'>할머니</span>",
                "id": 1
            },
        ]
    },
    {
        "groupName": "외삼촌네",
        "groupData": [
            {
                "name": "정경택 <span class='family-title'>외삼촌</span>",
                "id": 2
            },
            {
                "name": "김효인 <span class='family-title'>외숙모</span>",
                "id": 3
            },
            {
                "name": "정지은",
                "id": 10
            },
            {
                "name": "정지우",
                "id": 11
            },
            {
                "name": "정우성",
                "id": 12
            }
        ]
    },
    {
        "groupName": "이모네",
        "groupData": [
            {
                "name": "정미영 <span class='family-title'>이모</span>",
                "id": 4
            },
            {
                "name": "김종욱 <span class='family-title'>이모부</span>",
                "id": 5
            },
            {
                "name": "김솔",
                "id": 13
            },
            {
                "name": "김민태",
                "id": 14
            }
        ]
    },
    {
        "groupName": "이모네",
        "groupData": [
            {
                "name": "정경남 <span class='family-title'>이모</span>",
                "id": 6
            },
            {
                "name": "양창수 <span class='family-title'>이모부</span>",
                "id": 7
            },
            {
                "name": "양선",
                "id": 15
            },
            {
                "name": "양은혜",
                "id": 16
            },
            {
                "name": "양한나",
                "id": 17
            }
        ]
    },
    {
        "groupName": "우리 가족",
        "groupData": [
            {
                "name": "정혜경 <span class='family-title'>엄마</span>",
                "id": 8
            },
            {
                "name": "박종두 <span class='family-title'>아빠</span>",
                "id": 9
            },
            {
                "name": "박준수",
                "id": 18
            },
            {
                "name": "박승수",
                "id": 19
            },
            {
                "name": "박혜수",
                "id": 20
            }
        ]
    }
];




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

var participans_transfer = $("#participants-transfer").transfer(settings);





function mypartner(me){
    var ptn = window.nchart[window.nchart[me].partner];
    if (ptn){
        if(ptn.gender == "male"){
            ptn.title = "남편"
        }
        else(
            ptn.title = "아내"
        )
    }
}

function myparent(me){
    if(window.nchart[window.nchart[me].pid].gender == "male"){
        window.nchart[window.nchart[me].pid].title = "아버지";
        window.nchart[window.nchart[me].ppid].title = "어머니";
    }
    else{
        window.nchart[window.nchart[me].pid].title = "어머니";
        window.nchart[window.nchart[me].ppid].title = "아버지";
    }
}

function mychild(chld){
    child = window.nchart[chld];
    if (child.gender == "male"){
        child.title = "아들";
    }
    else{
        child.title = "딸";
    }
}

function mychildpt(chld){
    if (window.nchart[chld].gender == "male"){
        window.nchart[chld].title = "사위";
    }
    else{
        window.nchart[chld].title = "며느리";
    }
}

function main(getme){ 

    var fst = [0, 1];
    var snd = [];
    var snd_2 = [];
    var thrd = [];

    window.nchart = [
        { id: 0, tags: ["blue"], partner: 1, name: "정창식", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg"},
        { id: 1, pid: 0, tags: ["partner"], partner: 0, name: "김영구", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 2, pid: 0, ppid: 1, tags: ["default"], partner: 3, name: "정경택", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 3, pid: 2, tags: ["partner"], partner: 2, name: "김효인", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 4, pid: 0, ppid: 1, tags: ["default"], partner: 5, name: "정미영", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 5, pid: 4, tags: ["partner"], partner: 4, name: "김종욱", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 6, pid: 0, ppid: 1, tags: ["default"], partner: 7, name: "정경남", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 7, pid: 6, tags: ["partner"], partner: 6, name: "양창수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 8, pid: 0, ppid: 1, tags: ["default"], partner: 9, name: "정혜경", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 9, pid: 8, tags: ["partner"], partner: 8, name: "박종두", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 10, pid: 2, ppid: 3, tags: ["default"], name: "정지은", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 11, pid: 2, ppid: 3, tags: ["default"], name: "정지우", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 12, pid: 2, ppid: 3, tags: ["default"], name: "정우성", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 13, pid: 4, ppid: 5, tags: ["default"], name: "김솔", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 14, pid: 4, ppid: 5, tags: ["default"], name: "김민태", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 15, pid: 6, ppid: 7, tags: ["default"], name: "양선", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 16, pid: 6, ppid: 7, tags: ["default"], name: "양은혜", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 17, pid: 6, ppid: 7, tags: ["default"], name: "양한나", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 18, pid: 8, ppid: 9, tags: ["default"], name: "박준수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 19, pid: 8, ppid: 9, tags: ["default"], name: "박승수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
        { id: 20, pid: 8, ppid: 9, tags: ["default"], name: "박혜수", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    ];

    for (let i = 0; i < window.nchart.length; i++){
        if (window.nchart[i].pid == 0 && window.nchart[i].ppid == 1){
            snd.push(i);
            snd_2.push(window.nchart[i].partner? window.nchart[i].partner: -1);
        }
    }

    for (let j = 0; j<snd.length; j++){
        var children = [];
        for (let i = 0; i<window.nchart.length; i++){
            if (window.nchart[i].pid == snd[j] && window.nchart[i].ppid == snd_2[j]){
                children.push(i);
            }
        }
        thrd.push(children? children: []);
    }

    var me = getme; // id 숫자
    window.nchart[me].title = "나";

    console.log("fst:" + fst);
    console.log("snd:" + snd);
    console.log("snd2:" + snd_2);
    console.log("thrd:" + thrd);

    if (fst.includes(me)){
        mypartner(me);

        for (let i = 0; i<snd.length; i++){
            mychild(snd[i]);
            mychildpt(snd_2[i]);

            for (let j = 0; j< thrd[i].length; j++){
                window.nchart[thrd[i][j]].title = "손주"
            }
        }
    }
    else if (snd.includes(me)){
        mypartner(me);
        myparent(me);
        chldnum = snd.indexOf(me)
        for (let i = 0; i<snd.length; i++){
            if (i == chldnum){
                for (let j = 0; j< thrd[i].length; j++){
                    mychild(thrd[i][j]);
                }
            }
            else{
                for (let j = 0; j< thrd[i].length; j++){
                    window.nchart[thrd[i][j]].title = "조카";
                }
            }
        }
    }
    else if (snd_2.includes(me)){
        mypartner(me);
        var ptn = window.nchart[me].partner
        myparent(ptn);
        chldnum = snd.indexOf(ptn)
        for (let i = 0; i<snd.length; i++){
            if (i == chldnum){
                for (let j = 0; j< thrd[i].length; j++){
                    mychild(thrd[i][j]);
                }
            }
            else{
                for (let j = 0; j< thrd[i].length; j++){
                    window.nchart[thrd[i][j]].title = "조카";
                }
            }
        }
    }
    else{
        var menum = -1;
        for (let i = 0; i< thrd.length; i++){
            if (thrd[i].includes(me)){
                menum = i;
            }
        }
        var father = (window.nchart[snd[menum]].gender == "male")
        if (father){
            if (window.nchart[0].gender == "male"){
                window.nchart[0].title = "할아버지";
                window.nchart[1].title = "할머니";
            }
            else{
                window.nchart[1].title = "할아버지";
                window.nchart[0].title = "할머니";
            }
        }
        else{
            if (window.nchart[0].gender == "male"){
                window.nchart[0].title = "외할아버지";
                window.nchart[1].title = "외할머니";
            }
            else{
                window.nchart[1].title = "외할아버지";
                window.nchart[0].title = "외할머니";
            }
        }
        for (let i = 0; i<snd.length; i++){
            if (i == menum){
                myparent(me);
            }
            else{
                if (father){
                    if(window.nchart[snd[i]].gender == "male"){
                        window.nchart[snd[i]].title = "삼촌"
                        window.nchart[snd_2[i]].title = "숙모"
                    }
                    if(window.nchart[snd[i]].gender == "female"){
                        window.nchart[snd[i]].title = "고모"
                        window.nchart[snd_2[i]].title = "고모부"
                    }
                }
                else{
                    if(window.nchart[snd[i]].gender == "male"){
                        window.nchart[snd[i]].title = "외삼촌"
                        window.nchart[snd_2[i]].title = "외숙모"
                    }
                    if(window.nchart[snd[i]].gender == "female"){
                        window.nchart[snd[i]].title = "이모"
                        window.nchart[snd_2[i]].title = "이모부"
                    }
                }
                for (let j = 0; j< thrd[i].length; j++){
                    window.nchart[thrd[i][j]].title = "사촌";
                }
            }
        }
    }
    return window.nchart;
}


