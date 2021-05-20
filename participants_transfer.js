var groupDataArray1 = [
    {
        "groupName": "솔이 이모네",
        "groupData": [
            {
                "name": "김종욱 <span class='family-title'>이모부</span>",
                "value": 122
            },
            {
                "name": "정미영 <span class='family-title'>이모</span>",
                "value": 643
            },
            {
                "name": "김민태 <span class='family-title'>오빠</span>",
                "value": 422
            },
            {
                "name": "김솔 <span class='family-title'>언니</span>",
                "value": 822
            }
        ]
    },
    {
        "groupName": "남이 이모네",
        "groupData": [
            {
                "name": "양창수 <span class='family-title'>이모부</span>",
                "value": 132
            },
            {
                "name": "정경남 <span class='family-title'>이모</span>",
                "value": 112
            },
            {
                "name": "양선",
                "value": 191
            },
            {
                "name": "양은혜",
                "value": 150
            },
            {
                "name": "양한나",
                "value": 160
            }
        ]
    }
];


familyChart = [
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
    { id: 8, pid: 2, ppid: 3, tags: ["default"], name: "m", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    { id: 9, pid: 4, ppid: 5, tags: ["default"], name: "m", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    { id: 10, pid: 6, ppid:7, tags: ["default"], name: "m", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
];

var settings = {
    groupDataArray: groupDataArray1,
    groupItemName: "groupName",
    groupArrayName: "groupData",
    itemName: "name",
    valueName: "value",
    tabNameText: "가족 구성원 목록",
    rightTabNameText: "참여자로 선택된 구성원",
    searchPlaceholderText: "찾기",
    callable: function (items) {
        console.dir(items)
    }
};

var participans_transfer = $("#participants-transfer").transfer(settings);

export {participans_transfer};