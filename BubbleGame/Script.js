const CreateGame=document.querySelector("#CreateGame");
const SearchNumber=document.querySelector("#SearchNumber");
const TotalScore=document.querySelector("#TotalScore");
const Timer=document.getElementById("Timer");
TotalScore.innerHTML=0;
function Refresh(){
    CreateGame.innerHTML="";
for(let i=0;i<=59;i++){
    const newElement=document.createElement("div");
    newElement.className = 'my-class';
    let val=Math.floor(Math.random()*10);
    newElement.innerHTML=val;
    CreateGame.appendChild(newElement);  
}
    return document.querySelectorAll(".my-class");
}

function GenerateRandomNumber(){
    let num= Math.floor(Math.random()*10);
    SearchNumber.innerHTML=num;
    return num;
}
let checkNum=GenerateRandomNumber();

function CheckNumber(){
    
Refresh().forEach(item => {
    item.addEventListener("click",(e)=>{
      if(checkNum==item.innerHTML){
        TotalScore.innerHTML=Number(TotalScore.innerHTML)+10;
        checkNum=GenerateRandomNumber();
        CheckNumber();
      }
    })
});
}
CheckNumber()
let t=60;
let Sc=setInterval(()=>{
    if(t>0){
        t--;
        Timer.innerHTML=t;
    }else{
        alert("Your Final Score is :"+ `${TotalScore.innerHTML}`);  
        location.reload();
        clearInterval(Sc);
    }
},1000)