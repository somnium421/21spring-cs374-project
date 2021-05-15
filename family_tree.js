// var chart = new OrgChart(document.getElementById("tree"), {
//     mouseScrool: OrgChart.action.none,
//               nodeBinding: {
//                   field_0: "name"
//               },
//               nodes: [
//                   { id: 1, name: "Amber McKenzie" },
//                   { id: 2, pid: 1, name: "Ava Field" },
//                   { id: 3, pid: 1, name: "Peter Stevens" }
//               ]
//           });

// var chart = new OrgChart(document.getElementById("tree"), {
//     template: "ula",
//     //mouseScrool: OrgChart.action.none,
//     nodeBinding: {
//         field_0: "Name",
//         field_1: "Title",
//         img_0: "Photo"
//     },
//     nodeMenu: {
//         details: { text: "Details" },
//         edit: { text: "Edit" },
//         add: { text: "Add" },
//         remove: { text: "Remove" }
//     }           
// });

// nodes = [
//     { id: 1, "Name": "Denny Curtis", Title: "CEO", Photo: "https://cdn.balkan.app/shared/2.jpg" },
//     { id: 2, pid: 1, "Name": "Ashley Barnett", Title: "Sales Manager", Photo: "https://cdn.balkan.app/shared/3.jpg" },
//     { id: 3, pid: 1, "Name": "Caden Ellison", Title: "Dev Manager", Photo: "https://cdn.balkan.app/shared/4.jpg" },
//     { id: 4, pid: 2, "Name": "Elliot Patel", Title: "Sales", Photo: "https://cdn.balkan.app/shared/5.jpg" },
//     { id: 5, pid: 2, "Name": "Lynn Hussain", Title: "Sales", Photo: "https://cdn.balkan.app/shared/6.jpg" },
//     { id: 6, pid: 3, "Name": "Tanner May", Title: "Developer", Photo: "https://cdn.balkan.app/shared/7.jpg" },
//     { id: 7, pid: 3, "Name": "Fran Parsons", Title: "Developer", Photo: "https://cdn.balkan.app/shared/8.jpg" }
// ];

// chart.on('init', function(sender){
// sender.editUI.show(1);
// });

// chart.load(nodes);

OrgChart.templates.group.link = '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';
OrgChart.templates.group.nodeMenuButton = '';
OrgChart.templates.group.min = Object.assign({}, OrgChart.templates.group);
OrgChart.templates.group.min.imgs = "{val}";
OrgChart.templates.group.min.description = '<text width="230" text-overflow="multiline" style="font-size: 14px;" fill="#aeaeae" x="125" y="100" text-anchor="middle">{val}</text>';

var chart = new OrgChart(document.getElementById("tree"), {
    template: "ula",
    enableDragDrop: true,
    nodeMouseClick: OrgChart.action.edit,
    nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" }
    },
    // dragDropMenu: {
    //     addInGroup: { text: "Add in group" },
    //     addAsChild: { text: "Add as child" }
    // },
    nodeBinding: {
        field_0: "name",
        field_1: "title",
        img_0: "img",
        description: "description",
    },
    tags: {
        "group": {
            template: "group",
        },
        "couple-group": {
            subTreeConfig: {
                columns: 2
            }
        },
    }
});

chart.on('drop', function (sender, draggedNodeId, droppedNodeId) {
    var draggedNode = sender.getNode(draggedNodeId);
    var droppedNode = sender.getNode(droppedNodeId);

    if (droppedNode.tags.indexOf("group") != -1 && draggedNode.tags.indexOf("group") == -1) {
        var draggedNodeData = sender.get(draggedNode.id);
        draggedNodeData.pid = null;
        draggedNodeData.stpid = droppedNode.id;
        sender.updateNode(draggedNodeData);
        return false;
    }
});

chart.on('click', function (sender, args) {
    if (args.node.tags.indexOf("group") != -1) {
        if (args.node.min) {
            sender.maximize(args.node.id);
        }
        else {
            sender.minimize(args.node.id);
        }
    }
    return false;
});

chart.load([
    { id: "couple", name: "GrandParents", tags: ["couple-group", "group"], description: "GrandParents" },
    { id: 1, stpid: "couple", name: "Billy Moore", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
    { id: 2, stpid: "couple", name: "Marley Wilson", title: "Director", img: "https://cdn.balkan.app/shared/anim/1.gif" },
    { id: 4, stpid: "couple2", name: "Billie Rose", title: "Dev Team Lead", img: "https://cdn.balkan.app/shared/5.jpg" },
    { id: "couple2", pid: "couple", name: "Parents", tags: ["couple-group", "group"], description: "Human Resource | London" },
    { id: 5, pid: "couple", name: "Glenn Bell", title: "HR", img: "https://cdn.balkan.app/shared/10.jpg" },
    { id: 6, stpid: "couple2", name: "Marcel Brooks", title: "HR", img: "https://cdn.balkan.app/shared/11.jpg" },
    { id: 7, pid: "couple", name: "Maxwell Bates", title: "HR", img: "https://cdn.balkan.app/shared/12.jpg" },
    { id: 8, pid: "couple", name: "Asher Watts", title: "Junior HR", img: "https://cdn.balkan.app/shared/13.jpg" },
    { id: 9, pid: "couple2", name: "Skye Terrell", title: "Me", img: "https://cdn.balkan.app/shared/12.jpg" },
]);