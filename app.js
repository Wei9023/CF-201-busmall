'use strict'

var allPictures=[];

var productPic = document.getElementById('pictures');
var resultList = document.getElementById('list');
var clickTimes = 0;
var voteChart;
var chartDrawn = false;
var names = [];
var votes = [];
var views =[];
var votesInStorage = localStorage.getItem('votes');
var storagedVotes=[];
console.log(votesInStorage);


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
        
        allPictures[randomPicsIndexArray[i]].view++;
    }  
}

function updatePicArrays(){
    for (var i=0; i<allPictures.length; i++) {
        names[i] = allPictures[i].name;
        votes[i] = allPictures[i].vote;
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

var data = {
    labels: names,
    datasets: [{
        data: storagedVotes,
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


function loadStorage (){
    if ( votesInStorage != null) {      
        var productVotes= JSON.parse(localStorage.getItem('votes'));

        for(var i=0;i <productVotes.length; i++){
            storagedVotes[i] = votes[i] + productVotes[i]
            localStorage.setItem('votes', JSON.stringify(storagedVotes));
            console.log(storagedVotes);
        }
    }  else {
        localStorage.setItem('votes', JSON.stringify(votes));
        console.log(localStorage);
    }  
}

function handleClick(event){
    allPictures[parseInt( event.target.name)].vote++;

    productPic.innerHTML = "";
    var nextClick = getRandomPicIndexArray();
    showRandomPics(nextClick);
    clickTimes++;

    if(clickTimes >=10 ){
    productPic.innerHTML = "";
   
    showResults(); 
    updatePicArrays(); 
    loadStorage(); 
    drawChart();
           
    }
}

productPic.addEventListener('click', handleClick);

document.getElementById('product-chart').addEventListener('click', function(){
    document.getElementById('product-chart').hidden = true;
})

var randomPicsIndexArray = getRandomPicIndexArray();
showRandomPics(randomPicsIndexArray);
