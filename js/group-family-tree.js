//var familyCode = localStorage.getItem("family-code"); //"00AB8"
// var userID = localStorage.getItem("family-id"); // "0"
isAssign = (familyCode !== null && familyCode !== "undefined" && familyCode !== undefined);
lang = localStorage.getItem('lang');

$(document).ready(() => {
    if (isAssign){
        // console.log("is after?");
        /*--------------------------------------------------------
        -------------- for home_family_tree-----------------------
        --------------------------------------------------------*/
        OrgChart.templates.family_template = Object.assign({}, OrgChart.templates.ana);
        OrgChart.templates.family_template.size = [43, 43];
        // OrgChart.templates.family_template.plus = "";
        // OrgChart.templates.family_template.minus = "";
        OrgChart.templates.family_template.rippleRadius = 20;
        OrgChart.templates.family_template.name = '<text style="font-size: 10px;" fill="#000000" x="21.5" y="54" text-anchor="middle">{val}</text>';
        OrgChart.templates.family_template.title = '<text style="font-size: 10px;" fill="#aeaeae" x="21.5" y="64" text-anchor="middle">{val}</text>';
        OrgChart.templates.family_template.img = '<clipPath id="{randId}"><circle cx="21.5" cy="21.5" r="18"></circle></clipPath></circle><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="3" y="3"  width="40" height="40"></image>';
        OrgChart.templates.family_template.node = '<circle stroke-width="3" fill="none" stroke="#aeaeae" cx="21.5" cy="21.5" r="20"></circle>';
        OrgChart.templates.family_template.defs = '<g transform="matrix(0.05,0,0,0.05,-6.5,-7.5)" id="baby"><circle cx="130" cy="155" r="100" fill="#ffffff"></circle><path fill="#aeaeae" d="m468.64 268.32h-13.591c-18.432-89.348-95.612-157.432-189.139-161.798-.501-.185-1.015-.348-1.545-.482-18.363-4.622-31.188-22.595-31.188-43.707 0-17.828 14.468-32.333 32.252-32.333 12.573 0 22.802 10.258 22.802 22.866 0 8.284 6.716 15 15 15s15-6.716 15-15c0-29.15-23.687-52.866-52.802-52.866-34.326 0-62.252 27.962-62.252 62.333 0 17.876 5.828 34.443 15.769 47.432-80.698 15.127-144.725 78.25-161.291 158.555h-13.591c-24.103 0-43.712 19.596-43.712 43.683 0 24.086 19.609 43.682 43.712 43.682h14.692c20.935 89.871 101.582 157.018 197.596 157.018s176.66-67.148 197.596-157.018h14.692c24.103 0 43.712-19.596 43.712-43.682 0-24.087-19.609-43.683-43.712-43.683zm-265.054 55.257c-8.284-.024-14.981-6.758-14.958-15.043.007-2.337-.708-13.999-15.481-14.041-.026 0-.053 0-.08 0-14.697 0-15.475 11.62-15.481 13.953-.023 8.284-6.75 15.007-15.043 14.957-8.284-.024-14.98-6.759-14.957-15.043.038-13.322 5.349-25.101 14.955-33.166 8.223-6.904 19.065-10.702 30.543-10.702h.148c11.534.033 22.412 3.896 30.63 10.876 9.559 8.12 14.803 19.928 14.765 33.25-.023 8.27-6.735 14.957-14.999 14.957-.013.002-.027.002-.042.002zm52.766 129.374c-26.485 0-48.033-21.533-48.033-48.002 0-8.284 6.716-15 15-15s15 6.716 15 15c0 9.926 8.089 18.002 18.033 18.002s18.033-8.076 18.033-18.002c0-8.284 6.716-15 15-15s15 6.716 15 15c-.001 26.469-21.548 48.002-48.033 48.002zm113.765-129.374c-.015 0-.029 0-.044 0-8.284-.024-14.98-6.759-14.957-15.043.016-5.445-1.993-9.263-6.14-11.673-5.407-3.142-13.27-3.165-18.695-.053-4.161 2.387-6.191 6.193-6.207 11.638-.023 8.27-6.735 14.957-14.999 14.957-.015 0-.029 0-.043 0-8.284-.024-14.981-6.758-14.958-15.043.046-16.149 7.802-29.845 21.281-37.576 14.814-8.497 33.929-8.443 48.695.138 13.434 7.807 21.112 21.547 21.066 37.696-.023 8.271-6.735 14.959-14.999 14.959z"/> </g>';
        OrgChart.templates.family_template.nodeMenuButton = '';
        OrgChart.templates.family_template_blue = Object.assign({}, OrgChart.templates.family_template);
        OrgChart.templates.family_template_blue.node = '<circle stroke-width="3" fill="none" stroke="#039BE5" cx="21.5" cy="21.5" r="20"></circle>';
    
    
        var members=[], docID ;
        window.me;
        /*
    
        */
        window.newid;
    
        OrgChart.templates.family_template.minus = 
        `<g transform="matrix(1,0,0,1,0,30)" style="cursor:pointer;">
        <circle y="10" cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>
        <line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line></g>`
        OrgChart.templates.family_template.plus = 
        `<g transform="matrix(1,0,0,1,0,30)" style="cursor:pointer;">
        <circle y="10" cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>
        <line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line></g>`
    
        OrgChart.templates.group.min = Object.assign({}, OrgChart.templates.group);
        OrgChart.templates.group.nodeMenuButton = '';
                // '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" control-node-menu-id="{id}">'
                // + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
                // + '</rect>'
                // + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '</g>';
        OrgChart.templates.group.min.nodeMenuButton = '';
                // '<g style="cursor:pointer;" transform="matrix(1,0,0,1,200,15)" control-node-menu-id="{id}">'
                // + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
                // + '</rect>'
                // + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="#0890D3" />'
                // + '</g>';
        OrgChart.templates.group.min.node = 
                '<rect rx="30" ry="30" x="50" y="0" height="60" width="150" fill="#f2f2f2" stroke-width="0"></rect>'
        OrgChart.templates.group.min.textFieldWhenTheNodeIsMimized = '<text width="100" style="font-size: 12px;" fill="#aeaeae" x="{cw}" y="35" text-anchor="middle">{val}</text>'
            
        OrgChart.templates.group.textFieldWhenTheNodeIsMaximized = '<text width="100" style="font-size: 12px;" fill="#039BE5" x="{cw}" y="35" text-anchor="middle">{val}</text>'
        // OrgChart.templates.group.defs = '<g transform="matrix(0.05,0,0,0.05,-13,-15.5)" id="baby"><circle cx="260" cy="310" r="200" fill="#ffffff"></circle><path fill="#aeaeae" d="m468.64 268.32h-13.591c-18.432-89.348-95.612-157.432-189.139-161.798-.501-.185-1.015-.348-1.545-.482-18.363-4.622-31.188-22.595-31.188-43.707 0-17.828 14.468-32.333 32.252-32.333 12.573 0 22.802 10.258 22.802 22.866 0 8.284 6.716 15 15 15s15-6.716 15-15c0-29.15-23.687-52.866-52.802-52.866-34.326 0-62.252 27.962-62.252 62.333 0 17.876 5.828 34.443 15.769 47.432-80.698 15.127-144.725 78.25-161.291 158.555h-13.591c-24.103 0-43.712 19.596-43.712 43.683 0 24.086 19.609 43.682 43.712 43.682h14.692c20.935 89.871 101.582 157.018 197.596 157.018s176.66-67.148 197.596-157.018h14.692c24.103 0 43.712-19.596 43.712-43.682 0-24.087-19.609-43.683-43.712-43.683zm-265.054 55.257c-8.284-.024-14.981-6.758-14.958-15.043.007-2.337-.708-13.999-15.481-14.041-.026 0-.053 0-.08 0-14.697 0-15.475 11.62-15.481 13.953-.023 8.284-6.75 15.007-15.043 14.957-8.284-.024-14.98-6.759-14.957-15.043.038-13.322 5.349-25.101 14.955-33.166 8.223-6.904 19.065-10.702 30.543-10.702h.148c11.534.033 22.412 3.896 30.63 10.876 9.559 8.12 14.803 19.928 14.765 33.25-.023 8.27-6.735 14.957-14.999 14.957-.013.002-.027.002-.042.002zm52.766 129.374c-26.485 0-48.033-21.533-48.033-48.002 0-8.284 6.716-15 15-15s15 6.716 15 15c0 9.926 8.089 18.002 18.033 18.002s18.033-8.076 18.033-18.002c0-8.284 6.716-15 15-15s15 6.716 15 15c-.001 26.469-21.548 48.002-48.033 48.002zm113.765-129.374c-.015 0-.029 0-.044 0-8.284-.024-14.98-6.759-14.957-15.043.016-5.445-1.993-9.263-6.14-11.673-5.407-3.142-13.27-3.165-18.695-.053-4.161 2.387-6.191 6.193-6.207 11.638-.023 8.27-6.735 14.957-14.999 14.957-.015 0-.029 0-.043 0-8.284-.024-14.981-6.758-14.958-15.043.046-16.149 7.802-29.845 21.281-37.576 14.814-8.497 33.929-8.443 48.695.138 13.434 7.807 21.112 21.547 21.066 37.696-.023 8.271-6.735 14.959-14.999 14.959z"/> </g>';
    
        db.collection('families').where('code', '==', familyCode)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                // console.log("hi");
                docID = doc.id;
                members = doc.data().members;    
                window.newid = members.length;   
    
            })
            
            // console.log(document.getElementById("family-tree"));
            // console.log("fam_mem"+window.family_members)
            chart = new OrgChart(document.getElementById("family-tree"), {
                template: "family_template",
                mouseScrool: OrgChart.action.none,
                nodeMouseClick: OrgChart.action.none,
                showXScroll: OrgChart.scroll.visible, 
                showYScroll: OrgChart.scroll.visible, 
                enableSearch: false,
                siblingSeparation: 40,
                nodeBinding: {
                    name: "name",
                    gender: "gender",
                    partner: "partner",
                    title: "title",
                    img: "img",
                    textFieldWhenTheNodeIsMimized: "textWhenTheNodeIsMimized",
                    textFieldWhenTheNodeIsMaximized: "textWhenTheNodeIsMaximized"
                },
                tags: {
                    blue: {
                    template: "family_template_blue",
                    siblingSeparation: 20,
                
                    },
                    // for group!
                    "node_with_subtrees": {
                        template: "group",
                        subTreeConfig: {
                        siblingSeparation: 30,
                        columns: 1,
                        orientation: OrgChart.orientation.vertical,
                        //   levle: 2,
            
                        }
                    },
                    "partner":{
                        siblingSeparation: 20,
                    },
                    "default":{
                        siblingSeparation: 20,
                    }
                
            
                },
                nodeMenu:{
                    
                },
                
            });
            
            
            chart.editUI.on('field', function(sender, args){
                if (args.name == 'partner' || args.name == 'title' || args.name == 'img'){
                    return false;
                }
            });
            
            
            finalchart = main(userID);
    
    
            addGroupBox_forHome();
            chart.load(finalchart);
            
        })
    
    
    
        function addGroupBox_forHome(){
            // console.log("in group box"+window.newid);
            var nodenum = window.newid;
            for(var cnt = 2; cnt < nodenum; cnt ++){
                
                var node = window.nchart[cnt];
                
                if((node.pid ==0 )&& (node.ppid > 0) ){
                    // for colomn 1
                    for(var ccnt= 2; ccnt<nodenum; ccnt++){
                        var node2 = window.nchart[ccnt];
                        // console.log(node2);
                        if((node2.pid == node.id ) ||(node2.ppid ==  node.id)){
                            nchart[ccnt] = { id: node2.id, stpid : window.newid, tags: node2.tags, name: node2.name,partner: node2.partner, img: node2.img, title: node2.title,  gender: node2.gender};                    
                        }
                    }
                    nchart[cnt] = { id: node.id, stpid : window.newid, tags: node.tags, name: node.name ,partner: node.partner, img: node.img, title: node.title,  gender: node.gender};
                    // console.log("title : " +node.title);
                    // console.log("title: "+node.title)
                    if(node.title == undefined || node.title == ""){
                        // console.log("in undefi")
                        console.log("wtf is: " + node.name);
                        var data = {id:window.newid, pid: 0, ppid:1 , tags: ["node_with_subtrees"],textWhenTheNodeIsMimized: node.name+"네", textWhenTheNodeIsMaximized: node.name+"네"};
    
                    }
                    else if(node.title == "아내" ||node.title == "나" || node.title == "남편" ||node.title == "아버지"||node.title == "어머니"){
                        var data = {id:window.newid, pid: 0, ppid:1 , tags: ["node_with_subtrees"],textWhenTheNodeIsMimized: "우리 가족", textWhenTheNodeIsMaximized: "우리 가족"};
                        // console.log("in 우리")
                    }
                    else{
                        // console.log("in else")
                        console.log("wtf is: " + node.name);
                        var data = {id:window.newid, pid: 0, ppid:1 , tags: ["node_with_subtrees"],textWhenTheNodeIsMimized: node.title+"네", textWhenTheNodeIsMaximized: node.title+"네"};
                    }
                    nchart.push(data);
                    window.newid ++;    
                }
                    
            }
        }
    
    }else {
        if (lang =='en'){
            $("#family-tree").append(`<p class="card-text text-muted mt-3">No family tree yet. <a href="load-family-tree.html" class="card-link">Make one</a>
                </p>`)
    
            $(".family-tree-card").attr("class", "card h-100 shadow pb-3 bg-light")
        }
        else{
            $("#family-tree").append(`<p class="card-text text-muted mt-3">아직 가족 관계도가 없습니다. <a href="load-family-tree.html" class="card-link">생성하기</a>
                </p>`)
    
            $(".family-tree-card").attr("class", "card h-100 shadow pb-3 bg-light")
        }
        
    }
    
    

})



function mypartner(me){
    var ptn = window.nchart[window.nchart[me].partner];
    if(ptn){
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
    window.nchart = members;

    var fst = [0, 1];
    var snd = [];
    var snd_2 = [];
    var thrd = [];

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

    var me = Number(getme); // id 숫자
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

$('#logout-button').click(() => {
    localStorage.removeItem('family-code');
    localStorage.removeItem('family-id');
    localStorage.removeItem('id');
    localStorage.removeItem('pw');
    location.href = "index.html";
})