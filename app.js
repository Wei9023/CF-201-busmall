'use strict'

var allPictures=[];

var productPic = document.getElementById('pictures');
var resultList = document.getElementById('list');
var clickTimes = 0;
var voteChart;
var chartDrawn = false;
var names = [];
// var ratio = [];
var votes = [];
var views =[];

function ProductPic (name, suffix) {
    this.name = name;
    this.filepath = `img/${name}.${suffix}`;
    this.view = 0;
    this.vote = 0;
    allPictures.push(this);
}


new ProductPic("bag", "jpg");
new ProductPic("banana", "jpg");
new ProductPic("bathroom", "jpg");
new ProductPic("boots", "jpg");
new ProductPic("breakfast", "jpg");
new ProductPic("bubblegum", "jpg");
new ProductPic("chair", "jpg");
new ProductPic("cthulhu", "jpg");
new ProductPic("dog-duck", "jpg");
new ProductPic("dragon", "jpg");
new ProductPic("pen", "jpg");
new ProductPic("pet-sweep", "jpg");
new ProductPic("scissors", "jpg");
new ProductPic("shark", "jpg");
new ProductPic("sweep", "png");
new ProductPic("tauntaun", "jpg");
new ProductPic("unicorn", "jpg");
new ProductPic("usb", "gif");
new ProductPic("water-can", "jpg");
new ProductPic("wine-glass", "jpg");


var previousPicIndexArray = [];
var currentPicIndexArray = [];
function getRandomPicIndexArray(){
    
    currentPicIndexArray = [];

    while( currentPicIndexArray.length < 3 ){
        var randomIndex = Math.floor(Math.random()* allPictures.length);
        if( !currentPicIndexArray.includes(randomIndex) && !previousPicIndexArray.includes(randomIndex) ){
            currentPicIndexArray[currentPicIndexArray.length] = randomIndex;
        } 
    }
    // alert(currentPicIndexArray);
    previousPicIndexArray = currentPicIndexArray;
    return currentPicIndexArray;
}


function showRandomPics(randomPicsIndexArray){
    for(var i=0; i<randomPicsIndexArray.length; i++){
        // alert(allPictures[randomPicsIndexArray[i]].filepath);
        var tmpPicObject = allPictures[randomPicsIndexArray[i]];
        var imgEl = document.createElement('img');
        imgEl.setAttribute("src", tmpPicObject.filepath);
        imgEl.setAttribute("alt", tmpPicObject.name);
        imgEl.setAttribute("name", randomPicsIndexArray[i]);
        
        productPic.appendChild(imgEl);
        
        // generatePics.src =allPictures[randomPicsIndexArray[i]].filepath;
        // generatePics.name =allPictures[randomPicsIndexArray[i]].name;
        // generatePics.alt = allPictures[randomPicsIndexArray[i]].name;
        allPictures[randomPicsIndexArray[i]].view++;
        // randomPics.push(generatePics);
    }  
}


function updatePicArrays(){
    for (var i=0; i<allPictures.length; i++) {
        names[i] = allPictures[i].name;
        votes[i] = allPictures[i].vote;
        // views[i] = allPictures[i].view;
        //ratio[i] = parseInt(allPictures[i].vote/allPictures[i].view);
        console.log(names);
        // console.log(ratio);
        console.log(votes);
        // console.log(views);
    }
}



ProductPic.prototype.render = function() {
    var imgEl = document.createElement('img');
    for(var i=0; i<randomPics.length; i++){
        imgEl.innerHTML= "<img src='" + randomPic[i].src +"' alt='" + randomPic[i].name + "' name = '" + randomPic[i].name + "'></img>";
        productPic.appendChild(imgEl);
    }
}




function showResults(){
    var ulEl = document.createElement('ul');
    
    for (var i=0; i< allPictures.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = `${allPictures[i].vote} vote(s) for ${allPictures[i].name}`
        ulEl.appendChild(liEl);
    }
    resultList.appendChild(ulEl);
    
}

// function tallyVote(thisPic) {
//     for (var i=0; i<allPictures.length; i++) {
//         if(thisPic === allPictures[i].)
//     }
// }



var data = {
    labels: names,
    datasets: [{
        data: votes,
        backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)' , 
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        ],
    }]

};

function drawChart() {
    var ctx = document.getElementById('product-chart').getContext('2d');

    voteChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: false,
            animation: {
                dduration: 10000,
                easing: 'easeOutBounce'
            }
        },
        scales: {
            yAxes:[{
                ticks:{
                    max: 10,
                    min: 0,
                    stepSize: 1.0
                }
            }]
        }
    });
    chartDrawn = true;
}

function hideChart() {
    document.getElementById('product-Chart').hidden = true;
}



function handleClick(event){

    
        // console.log(event.target);

        allPictures[parseInt( event.target.name)].vote++;

        productPic.innerHTML = "";
        var nextClick = getRandomPicIndexArray();
        showRandomPics(nextClick);
        clickTimes++;

        if(clickTimes >=25 ){

             productPic.innerHTML = "";

            showResults(); 
            updatePicArrays(); 
            drawChart();
        }
}

productPic.addEventListener('click', handleClick);

document.getElementById('product-chart').addEventListener('click', function(){
    document.getElementById('product-chart').hidden = true;
})

var randomPicsIndexArray = getRandomPicIndexArray();
showRandomPics(randomPicsIndexArray);
