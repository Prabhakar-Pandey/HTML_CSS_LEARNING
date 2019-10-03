function exicute(){
    var root = document.getElementById("root");
    var text = "hello";
    var df = document.createDocumentFragment();
    var div = document.createElement("div");
    div.className = "wrapper";
    div.innerHTML = "<div id='toolTip'>Tool tip</div>"
    df.appendChild(div);
    
    var toolTip = df.getElementById('toolTip');
    toolTip.innerHTML = "<div class='pointer-top'>"+
                        "</div>"+
                        "<div class='content'>"+
                        "<p>This is content</p>"+
                        "</div>";
    root.appendChild(df)
}
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

   


    exicute();
    var btn = document.getElementsByTagName('input');
    var toolTip = document.getElementById('toolTip');
    var html = document.getElementsByTagName("html")[0];
    var viewPort = html.getBoundingClientRect()
    for(var i=0; i<btn.length;i++){
        btn[i].addEventListener('mouseover',(e)=>{
            
            
            toolTip.style.top = e.y+'px';
            toolTip.style.left = e.x+'px';
            toolTip.style.transform = "translate(-50%, 0px)";
            toolTip.children[0].className = "pointer-top"
            toolTip.style.display = "block";
            var rect = toolTip.getBoundingClientRect();
            if(rect.x<0||rect.y<0){
                toolTip.style.top = e.y+'px';
                toolTip.style.left = e.x+'px';
                toolTip.style.transform = "translate(20%, -100%)";
                toolTip.children[0].className = "pointer-left";
                return;
            }
            if(rect.x+rect.width>window.innerWidth){
                toolTip.style.top = e.y+'px';
                toolTip.style.left = e.x+'px';
                toolTip.style.transform = "translate(-120%, -100%)";
                toolTip.children[0].className = "pointer-right"
                return;
            }
            if(rect.y+rect.height> window.innerHeight){
                toolTip.style.top = e.y+'px';
                toolTip.style.left = e.x+'px';
                toolTip.style.transform = "translate(-65%, -200%)";
                toolTip.children[0].className = "pointer-bottom"
                return;
            }


            console.log(e)
        })
    }
    
    
});



// let obj = [{
//     name:"a",
//     city:"blr"
// },
// {
//     name:"b",
//     city:"blr"
// },
// {
//     name:"a",
//     city:"ccu"
// }]

// function createObj(arr,key){
//     let acc = {};
//     var newObj = arr.reduce((acc,currentIndex)=>{
//         if(acc[currentIndex[key]]){
//             acc[currentIndex[key]].push(currentIndex)
//         }else{
//             acc[currentIndex[key]]=[currentIndex]
//         }
//         return acc;
//     },acc);
//     return newObj;
// }

// console.log(createObj(obj,"city"));