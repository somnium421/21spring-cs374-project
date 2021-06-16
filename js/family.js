
// import firebase  from "firebase";

// var familyCode = "4NAF0";
//localStorage.setItem('family-code', "00AB8");
const familyCode = localStorage.getItem('family-code');
var ichart=[], docID ;
const userID = localStorage.getItem("family-id");
const userName = localStorage.getItem("name");
const userImg = localStorage.getItem("img");
lang = localStorage.getItem('lang');
var imgDrawn = false;

if (userImg !== undefined && userImg !== null && userImg !== 'undefined' && userImg !== ""){
    $('#user-name').text(userName);
    $('#user-img').attr('src', userImg);
    imgDrawn = true;
}

OrgChart.templates.family_template = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.family_template.size = [86, 86];
OrgChart.templates.family_template.plus = "";
OrgChart.templates.family_template.minus = "";
OrgChart.templates.family_template.rippleRadius = 40;
OrgChart.templates.family_template.name = '<text style="font-size: 12px;" fill="#000000" x="43" y="100" text-anchor="middle">{val}</text>';
OrgChart.templates.family_template.title = '<text style="font-size: 12px;" fill="#aeaeae" x="43" y="115" text-anchor="middle">{val}</text>';
OrgChart.templates.family_template.img = '<clipPath id="{randId}"><circle cx="43" cy="43" r="38.5"></circle></clipPath></circle><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="3" y="3"  width="80" height="80" opacity="0.3"></image>';
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
// OrgChart.templates.family_template_blue.node = '<circle stroke-width="3" fill="none" stroke="#039BE5" cx="43" cy="43" r="41.5"></circle>';
OrgChart.templates.family_template_blue.img = '<clipPath id="{randId}"><circle cx="43" cy="43" r="38.5"></circle></clipPath></circle><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="3" y="3"  width="80" height="80" opacity="1"></image>';





db.collection('families').where('code', '==', familyCode)
.get()
.then((snapshot) => {
    snapshot.forEach((doc) => {
        console.log("hi");
        docID = doc.id;
        ichart = doc.data().members;   
        if (!imgDrawn){
            for (var member of ichart) {
                if (member.id == userID) {
                    $('#user-name').text(member.name);
                    $('#user-img').attr('src', member.img);
                }
            }
        }
    })

    chart = new OrgChart(document.getElementById("my-family-tree"), {
        template: "family_template",
        mouseScrool: OrgChart.action.none,
        nodeMouseClick: OrgChart.action.none,
        showXScroll: OrgChart.scroll.visible, 
        showYScroll: OrgChart.scroll.visible, 
        enableSearch: false,
        siblingSeparation: 80,
        nodeBinding: {
            name: "name",
            gender: "gender",
            partner: "partner",
            title: "title",
            img: "img",
        },
        tags: {
            blue: {
                template: "family_template_blue"
            }
        },
    });
    
    
    chart.editUI.on('field', function(sender, args){
        if (args.name == 'partner' || args.name == 'title' || args.name == 'img' || args.name == "ppid"){
            return false;
        }
    });

    finalchart = main(userID);
    chart.load(finalchart);
    
    // chart.on('update', function (sender, oldNode, newNode) {
    //     console.log("upddfdfate");
    //     console.log(newNode);
    //     console.log(oldNode);
    
    //     console.log(chart.getNode(id));
    //     $('#assign-check').show();
    //     chart.load();
        
    // });  
    // chart.on('click',function(sender, arg){
    //     console.log("click");
    //     console.log(arg.node);
    
    //     me = arg.node;
    //     console.log(me);    

    
    // })
    setFamilyCode(); 
})
// console.log("fam_mem2"+window.family_members)

function setFamilyCode()  {
    if(lang =='en'){
        $("#family-code").append('<h5 class="mt-2">Family Code : <span class="text-primary">'+familyCode+'</span></h5>');
    }
    else{
        $("#family-code").append('<h5 class="mt-2">가족 코드 : <span class="text-primary">'+familyCode+'</span></h5>');
    }
    // const code = document.getElementById('family-code');
    // code.innerHTML = '<h5 class="mt-2" id="family-code">가족코드: '+familyCode+'</h5>';
}

function mypartner(me){
    var ptn = ichart[ichart[me].partner];
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
    if(ichart[ichart[me].pid].gender == "male"){
        ichart[ichart[me].pid].title = "아버지";
        ichart[ichart[me].ppid].title = "어머니";
    }
    else{
        ichart[ichart[me].pid].title = "어머니";
        ichart[ichart[me].ppid].title = "아버지";
    }
}
function mychild(chld){
    child = ichart[chld];
    if (child.gender == "male"){
        child.title = "아들";
    }
    else{
        child.title = "딸";
    }
}
function mychildpt(chld){
    if (ichart[chld].gender == "male"){
        ichart[chld].title = "사위";
    }
    else{
        ichart[chld].title = "며느리";
    }
}

function main(getme){

    var fst = [0, 1];
    var snd = [];
    var snd_2 = [];
    var thrd = [];

    for (let i = 0; i < ichart.length; i++){
        if (ichart[i].pid == 0 && ichart[i].ppid == 1){
            snd.push(i);
            snd_2.push(ichart[i].partner? ichart[i].partner: -1);
        }
    }

    for (let j = 0; j<snd.length; j++){
        var children = [];
        for (let i = 0; i<ichart.length; i++){
            if (ichart[i].pid == snd[j] && ichart[i].ppid == snd_2[j]){
                children.push(i);
            }
        }
        thrd.push(children? children: []);
    }

    var me = Number(getme); // id 숫자
    ichart[me].title = "나";

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
                ichart[thrd[i][j]].title = "손주"
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
                    ichart[thrd[i][j]].title = "조카";
                }
            }
        }
    }
    else if (snd_2.includes(me)){
        mypartner(me);
        var ptn = ichart[me].partner
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
                    ichart[thrd[i][j]].title = "조카";
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
        var father = (ichart[snd[menum]].gender == "male")
        if (father){
            if (ichart[0].gender == "male"){
                ichart[0].title = "할아버지";
                ichart[1].title = "할머니";
            }
            else{
                ichart[1].title = "할아버지";
                ichart[0].title = "할머니";
            }
        }
        else{
            if (ichart[0].gender == "male"){
                ichart[0].title = "외할아버지";
                ichart[1].title = "외할머니";
            }
            else{
                ichart[1].title = "외할아버지";
                ichart[0].title = "외할머니";
            }
        }
        for (let i = 0; i<snd.length; i++){
            if (i == menum){
                myparent(me);
            }
            else{
                if (father){
                    if(ichart[snd[i]].gender == "male"){
                        ichart[snd[i]].title = "삼촌"
                        ichart[snd_2[i]].title = "숙모"
                    }
                    if(ichart[snd[i]].gender == "female"){
                        ichart[snd[i]].title = "고모"
                        ichart[snd_2[i]].title = "고모부"
                    }
                }
                else{
                    if(ichart[snd[i]].gender == "male"){
                        ichart[snd[i]].title = "외삼촌"
                        ichart[snd_2[i]].title = "외숙모"
                    }
                    if(ichart[snd[i]].gender == "female"){
                        ichart[snd[i]].title = "이모"
                        ichart[snd_2[i]].title = "이모부"
                    }
                }
                for (let j = 0; j< thrd[i].length; j++){
                    ichart[thrd[i][j]].title = "사촌";
                }
            }
        }
    }
    return ichart;
}
$('#logout-button').click(() => {
    localStorage.removeItem('family-code');
    localStorage.removeItem('family-id');
localStorage.removeItem('name');
localStorage.removeItem('img');
    localStorage.removeItem('id');
    localStorage.removeItem('pw');
    location.href = "index.html";
    localStorage.removeItem('real-family-id');
})