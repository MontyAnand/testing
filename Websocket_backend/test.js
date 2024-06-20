let list = [2,3,4,5,1];

for(let i=0;i<list.length;i++){
    setInterval(()=>{
        list[i]++;
    },1000);
}

setInterval(()=>{
    console.log(list);
},5000);