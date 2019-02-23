window.onload = createGraph;
// Declaring Variables
var PointsArray;
var scale = 30;
var x = 40, g = 0;
var sum, weekHours, high;
var average, lowestH, hour, avg;
/* Get data from local storage. So that, if user open app 
   it fetch the old data. If data is not available then 
   declare an empty array.
*/
if (localStorage.getItem('Database')) {
  PointsArray = JSON.parse(localStorage.getItem('Database'));
}else{
  PointsArray = [];
}
/*
    Plot function plots a point on graph. This function is 
    executed after dataInput() function on line #60, after
    verification of data.
*/
function plot(){
  sum = 0;
  if(PointsArray.length>=8){

  }else{
    // Declare starting point
    var points = `15, 250 `;
    // select SVG Polyline element using DOM
    var polyline = document.querySelector("polyline");
    // Loop that draw lines from point to point and plot circles 
    for(var y=0;y<PointsArray.length;y++){
      //plot circle    
      document.getElementsByTagName("circle")[y].setAttribute("cy", PointsArray[y]);
      // Store points of polyline in 'points' variable     
      points += `${40*(y+1)}, ${PointsArray[y]} `;

    }
    //Following code is for setting first point...
    g = 0;
    for(let k=0; k<PointsArray.length; k++){
      if(g!=0){
        document.getElementsByTagName("circle")[k].setAttribute("cx", g+=40);
      }else{
        document.getElementsByTagName("circle")[k].setAttribute("cx", 40);
        g+=40;
      }

    }
    // Finally, plot the points
    polyline.setAttribute("points", points);
    // Find average of hours
    for(let i=0;i< PointsArray.length;i++){
      sum += (250 - PointsArray[i]) / 30;
    }
    average = sum/ PointsArray.length;
    // Find highest working hours
    lowestH = (250 - Math.min.apply(null, PointsArray))/30;

    document.querySelector(".avg").innerText = average.toFixed(1);
    document.querySelector(".wek").innerText = sum;
    document.querySelector(".high").innerText = lowestH;
    // Store all points  in database
    localStorage.setItem('Database', JSON.stringify(PointsArray));
  }
}
/*
    Datainput function gets input and verify it. After verification
    it manipulates the point according to scale  and formula on line #80

*/
const dataInput = function(){
  hour = document.querySelector("#hour").value;
  if(hour == ""){
    notification("Please input hours first", "danger", 2000);
  }else if(isNaN(hour)){
    notification("Input is not a number", "danger", 2000);
  }else if(hour > 7){
    notification("Range crossed!", "error", 1200);
  }else{
    hour = 250 - (scale * hour);
    PointsArray.push(hour);
    plot();
    document.querySelector("#hour").value = "";
    notification("Successfully added!","success", 1500);
  }

}
// reserGraph() executes on clicking reset button and resets the graph
const resetGraph = function(){
  weekHours = document.querySelector(".wek");
  avg = document.querySelector(".avg");
  high = document.querySelector(".high");
  avg.innerText = 0;
  weekHours.innerText = 0;
  high.innerText = 0;
  PointsArray = [];
  document.querySelector("polyline").setAttribute("points", "");

  document.querySelector("svg").innerHTML = `
<line stroke="black" x1="15" y1="15" x2="15" y2="250"/>
<line stroke="black" x1="15" y1="250" x2="300" y2="250"/>
<polyline points="" stroke="black" fill="none" stroke-width="1"/>
<!--  Points -->
<circle cx="15" r="2" fill="black"/>
<circle r="2" fill="black"/>
<circle r="2" fill="black"/>
<circle r="2" fill="black"/>
<circle r="2" fill="black"/>
<circle r="2" fill="black"/>
<circle r="2" fill="black"/>

<text x='26' y='268' style='font-size: 13px'>Mon</text>
<text x='68' y='268' style='font-size: 13px'>Tue</text>
<text x='106' y='268' style='font-size: 13px'>Wed</text>
<text x='150' y='268' style='font-size: 13px'>Thu</text>
<text x='195' y='268' style='font-size: 13px'>Fri</text>
<text x='231' y='268' style='font-size: 13px'>Sat</text>
<text x='274' y='268' style='font-size: 13px'>Sun</text>
`;
  createGraph();
  // clear database
  localStorage.clear();
  notification("Data removed", "success", 2200);

}
// this function draws horizontal and verticle lines on the graph
function createGraph(){
  for(var t=0;t<=7;t++){
    document.querySelector("svg").innerHTML +=  "<text x='4' y='"+ (255-(t*30)) +"'>"+ t + "<text/>";
  }
  for(var e=10;e<=250;e+=10){
    document.querySelector("svg").innerHTML += "<line x1='"+15+"' y1='"+ e +"' x2='300' y2='"+ e +"' stroke='black' stroke-width='0.5'/>";

  }
  for(var e=15;e<=300;e+=15){
    document.querySelector("svg").innerHTML += "<line x1='"+e+"' y1='"+15+"' x2='"+e+"' y2='"+ 250 +"' stroke='black' stroke-width='0.5'/>";

  }
  plot();
}
