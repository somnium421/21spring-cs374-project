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