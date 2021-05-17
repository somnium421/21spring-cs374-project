window.newid = 20;
window.editList = [];
OrgChart.templates.family_template = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.family_template.size = [86, 86];
OrgChart.templates.family_template.plus = "";
OrgChart.templates.family_template.minus = "";
OrgChart.templates.family_template.rippleRadius = 40;
OrgChart.templates.family_template.name = '<text style="font-size: 12px;" fill="#000000" x="43" y="100" text-anchor="middle">{val}</text>';
OrgChart.templates.family_template.title = '<text style="font-size: 12px;" fill="#aeaeae" x="43" y="115" text-anchor="middle">{val}</text>';
OrgChart.templates.family_template.img = '<clipPath id="{randId}"><circle cx="43" cy="43" r="38.5"></circle></clipPath></circle><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="3" y="3"  width="80" height="80"></image>';
OrgChart.templates.family_template.node = '<circle stroke-width="3" fill="none" stroke="#aeaeae" cx="43" cy="43" r="41.5"></circle>';
OrgChart.templates.family_template.defs = '<g transform="matrix(0.05,0,0,0.05,-13,-15.5)" id="baby"><circle cx="260" cy="310" r="200" fill="#ffffff"></circle><path fill="#aeaeae" d="m468.64 268.32h-13.591c-18.432-89.348-95.612-157.432-189.139-161.798-.501-.185-1.015-.348-1.545-.482-18.363-4.622-31.188-22.595-31.188-43.707 0-17.828 14.468-32.333 32.252-32.333 12.573 0 22.802 10.258 22.802 22.866 0 8.284 6.716 15 15 15s15-6.716 15-15c0-29.15-23.687-52.866-52.802-52.866-34.326 0-62.252 27.962-62.252 62.333 0 17.876 5.828 34.443 15.769 47.432-80.698 15.127-144.725 78.25-161.291 158.555h-13.591c-24.103 0-43.712 19.596-43.712 43.683 0 24.086 19.609 43.682 43.712 43.682h14.692c20.935 89.871 101.582 157.018 197.596 157.018s176.66-67.148 197.596-157.018h14.692c24.103 0 43.712-19.596 43.712-43.682 0-24.087-19.609-43.683-43.712-43.683zm-265.054 55.257c-8.284-.024-14.981-6.758-14.958-15.043.007-2.337-.708-13.999-15.481-14.041-.026 0-.053 0-.08 0-14.697 0-15.475 11.62-15.481 13.953-.023 8.284-6.75 15.007-15.043 14.957-8.284-.024-14.98-6.759-14.957-15.043.038-13.322 5.349-25.101 14.955-33.166 8.223-6.904 19.065-10.702 30.543-10.702h.148c11.534.033 22.412 3.896 30.63 10.876 9.559 8.12 14.803 19.928 14.765 33.25-.023 8.27-6.735 14.957-14.999 14.957-.013.002-.027.002-.042.002zm52.766 129.374c-26.485 0-48.033-21.533-48.033-48.002 0-8.284 6.716-15 15-15s15 6.716 15 15c0 9.926 8.089 18.002 18.033 18.002s18.033-8.076 18.033-18.002c0-8.284 6.716-15 15-15s15 6.716 15 15c-.001 26.469-21.548 48.002-48.033 48.002zm113.765-129.374c-.015 0-.029 0-.044 0-8.284-.024-14.98-6.759-14.957-15.043.016-5.445-1.993-9.263-6.14-11.673-5.407-3.142-13.27-3.165-18.695-.053-4.161 2.387-6.191 6.193-6.207 11.638-.023 8.27-6.735 14.957-14.999 14.957-.015 0-.029 0-.043 0-8.284-.024-14.981-6.758-14.958-15.043.046-16.149 7.802-29.845 21.281-37.576 14.814-8.497 33.929-8.443 48.695.138 13.434 7.807 21.112 21.547 21.066 37.696-.023 8.271-6.735 14.959-14.999 14.959z"/> </g>';
OrgChart.templates.family_template.nodeMenuButton = 
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" control-node-menu-id="{id}">'
        + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
        + '</rect>'
        + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="#0890D3" />'
        + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="#0890D3" />'
        + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="#0890D3" />'
        + '</g>';
OrgChart.templates.family_template_blue = Object.assign({}, OrgChart.templates.family_template);
OrgChart.templates.family_template_blue.node = '<circle stroke-width="3" fill="none" stroke="#039BE5" cx="43" cy="43" r="41.5"></circle>';


$( document ).ready(function() {
    console.log( "ready!" );
    editList = [];
});

var chart = new OrgChart(document.getElementById("tree"), {
    template: "family_template",
    mouseScrool: OrgChart.action.none,
    enableSearch: false,
    enableDragDrop: true,
    searchFields: ["name", "id"],
    siblingSeparation: 100,
    nodeBinding: {
        name: "name",
        partner: "partner",
        title: "title",
        img: "img",
    },
    tags: {
        blue: {
            template: "family_template_blue"
        }
    },
    nodeMenu:{
        // add:{text: "Add"},
        edit:{text: "나로 등록하기 Assign"},
        // edit:{text: "Edit", icon:OrgChart.icon.add(24,24, "#7A7A7A"), onClick: editNode},

        // remove:{text: "Remove"},
        // addPartner: {text:"Add partner", icon:OrgChart.icon.add(24,24, "#7A7A7A"), onClick: addPartner},
        // addChild: {text:"Add child", icon:OrgChart.icon.add(24,24, "#7A7A7A"), onClick: addChild}
    },
});

chart.on('render-link', function(sender, args){
    if (args.cnode.ppid != undefined){
        args.html += '<use xlink:href="#baby" x="'+ args.p.xa +'" y="'+ args.p.ya +'"/>';
    }
});

chart.on('update', function (sender, oldNode, newNode) {
    console.log("update," + newNode["id"]);
    if (oldNode != newNode){
        editList.push(newNode["id"]);
        // $(this).style.stroke="#039BE5";
    }
    console.log(editList);
    // newNode.editNode({tags: ["blue"]});

});

$("#finish-assign").click(function(){
    if(editList.length ==1){
        var id = chart.getNode(editList[0])["id"];
        var meNode = chart.config.nodes[id]
        console.log("in click,"+id);
        var nodedata = chart.get(id);
        console.log(nodedata);
        var old_tag = nodedata["tags"] ;
        nodedata["tags"] = [old_tag[0] ,"blue"];

        chart.updateNode(nodedata);


    }
    else{
        alert("하나의 노드만 수정하지 않았습니다. 새로고침 후 다시 시도하세요.")
    }

})



chart.load([          
    { id: 1, tags: ["blue"], partner: 2, name: "김덕수", title: "할아버지", img: "https://cdn.balkan.app/shared/empty-img-white.svg"},
    { id: 2, pid: 1, tags: ["partner"], partner: 1, name: "문옥주", title: "할머니", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
    { id: 3, pid: 1, tags: ["blue"], partner: 4,  ppid: 2, name: "Queen Elizabeth II", img: "https://cdn.balkan.app/shared/f5.png"},
    { id: 4, pid: 3, tags: ["left-partner"], spids: [3], name: "Prince Philip", title: "Duke of Edinburgh", img: "https://cdn.balkan.app/shared/f3.png"},
    // { id: 5, pid: 1, ppid: 2, name: "Princess Margaret", img: "https://cdn.balkan.app/shared/f6.png"},
    // { id: 6, pid: 3, tags: ["blue"], ppid: 4, name: "Charles", title: "Prince of Wales", img: "https://cdn.balkan.app/shared/f8.png"},
    // { id: 7, pid: 6, tags: ["partner"] , partner: 6, name: "Diana", title: "Princess of Wales", img: "https://cdn.balkan.app/shared/f9.png"},
    // { id: 9, pid: 3, ppid: 4 , name: "Anne", title: "Princess Royal", img: "https://cdn.balkan.app/shared/f10.png"},
    // { id: 10, pid: 3, ppid: 4 , name: "Prince Andrew", title: "Duke of York", img: "https://cdn.balkan.app/shared/f11.png"},
    // { id: 11, pid: 3, ppid: 4, name: "Prince Edward", title: "Earl of Wessex", img: "https://cdn.balkan.app/shared/f12.png"},
    // { id: 12, pid: 6, ppid: 7, tags: ["blue"], partner: 14, name: "Prince William", title: "Duch of Cambridge", img: "https://cdn.balkan.app/shared/f14.png"},
    // { id: 13, pid: 6, ppid: 7, partner: 15, name: "Prince Harry", img: "https://cdn.balkan.app/shared/f15.png"},
    // { id: 14, pid: 12, tags: ["left-partner"], partner: 12, name: "Catherine", title: "Duchess of Cambridge", img: "https://cdn.balkan.app/shared/f13.png"},
    // { id: 15, pid: 13, tags: ["right-partner"], partner: 13, name: "Meghan Markle", img: "https://cdn.balkan.app/shared/f16.png"},
    // { id: 16, pid: 12, ppid: 14, tags: ["blue"], name: "Prince George of Cambridge", img: "https://cdn.balkan.app/shared/f17.png"},
    // { id: 17, pid: 12, ppid: 14, tags: ["blue"], name: "Prince Charlotte of Cambridge", img: "https://cdn.balkan.app/shared/f18.png"},
    // { id: 18, pid: 12, ppid: 14, tags: ["blue"], name: "Prince Louis of Cambridge", img: "https://cdn.balkan.app/shared/f19.png"}
]);

function addPartner(nodeId){
	var node = chart.getNode(nodeId);
    var nodeData = chart.get(nodeId);
    chart.updateNode({ id: nodeId, pid: node.pid, ppid: node.ppid, tags: node.tags, name: nodeData["name"],partner: window.newid, img: nodeData["img"], title: nodeData["title"]});
	var data = {id:window.newid, pid: nodeId, tags: ["partner"], partner: nodeId, img: "https://cdn.balkan.app/shared/empty-img-white.svg"};
    chart.addNode(data);
    var children = node.children;
    for (var i = 0; i < children.length; i ++){
        var cnode = chart.getNode(children[i].id);
        var cnodeData = chart.get(children[i].id);
        chart.updateNode({ id: cnode.id, pid: cnode.pid, ppid: window.newid, tags: cnode.tags, name: cnodeData["name"],partner: cnodeData["partner"], img: cnodeData["img"], title: cnodeData["title"]});
    }
    console.log(chart.get(window.newid)["partner"]);
	window.newid ++;
    
}
function addChild(nodeId){
    var nodeData = chart.get(nodeId);
    console.log(nodeId, nodeData["partner"]);
    var data = {};
    if (!nodeData["partner"]){
        data = {id:window.newid, pid: nodeId, img: "https://cdn.balkan.app/shared/empty-img-white.svg"};
    }
    else if (nodeId < nodeData["partner"]){
        data = {id:window.newid, pid: nodeId, ppid: nodeData["partner"], img: "https://cdn.balkan.app/shared/empty-img-white.svg"};
    }
    else{
        data = {id:window.newid, pid: nodeData["partner"], ppid: nodeId, img: "https://cdn.balkan.app/shared/empty-img-white.svg"};
    }	
	chart.addNode(data);
    console.log(nodeId);
    window.newid++;
}
function editNode(nodeId){
	var node = chart.getNode(nodeId);
    node.attr("class", "node blue");
    console.log(nodeId+", edit");
    
}

var randomNum = {};
//0~9까지의 난수
randomNum.random = function(n1, n2) {
    return parseInt(Math.random() * (n2 -n1 +1)) + n1;
};
//인증번호를 뽑을 난수 입력 n 5이면 5자리
randomNum.authNo= function(n) {
    var value = "";
    for(var i=0; i<n; i++){
        value += randomNum.random(0,9);
    }
    return value;
};
//화면에 번호 출력
randomNum.printRandom =function(data,num) {
    document.getElementById(data).innerHTML = randomNum.authNo(num);
};
