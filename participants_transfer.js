

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

export {participans_transfer};