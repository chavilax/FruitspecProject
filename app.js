const express = require('express');
const app = express();
const server = app.listen(3000, () => { console.log('connect') });
const csv = require('csv-parser');
const fs = require('fs');



  

 const funcAVG = (N,arrN) => {
     var sumFruits=0;
     var remainFruits=0;
     var weight=0;
     let arr=[];
     var cutFruit=0;
    fs.createReadStream('ORRIR01C-test.csv')
    .pipe(csv())
    .on('data', (row) => {
        arr.push(row)
    })
    .on('end', () => {
        //the second line avg\
        console.log("arr len",arr.length);
        arr.splice(0,1);
        console.log("arr len2",arr.length);


        sumFruits=arr.length;
        remainFruits=sumFruits;
        for( let j=0; j<N && remainFruits>0; j++){
                   for(let f=0;f<remainFruits;f++){
 
                //last future
              if(j==N){
                weight+=parseFloat(arr[f][`Future${arrN[j]['future']}`]);
              }
              
             else   if(arr[f][`Future${arrN[j]['future']}`]>=arrN[j]['weight']){
    weight+=parseFloat(arr[f][`Future${arrN[j]['future']}`]);

  var index= arr.indexOf(arr[f]);
    arr.splice(index,1);
    remainFruits--;
    f--;
                }
            }
        }
        console.log("weight",weight);

        console.log('avg',weight/sumFruits);
        return weight/sumFruits;

    });

 }

 let arrN=[{future:2,weight:78}, {future:5,weight:40}, {future:7,weight:40}];
 funcAVG(N=3,arrN);
