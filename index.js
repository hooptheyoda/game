//set constants
const btn = document.getElementById('btn');
const startBtn = document.querySelector('#startBtn');
const nextBtn = document.querySelector('#nextBtn');
const directText = document.querySelector('#directText');
const op = document.querySelector('#op');
const replay = document.querySelector('#replay');
const wrapper1 = document.querySelector('.wrapper1');
const videoContainer = document.querySelector('.videoContainer');
const footer = document.querySelector('.footer');
const hint = document.querySelector('.hint');
const form = document.forms[0];
const question = document.querySelector('#question');
const answer = document.getElementById('answer');
const resultDiv = document.getElementById('result');
const wrong = document.getElementById('wrong');
const vdc = document.getElementById('vdc');
const hintTxt = document.getElementById('hintTxt');

//Modal
var modal = document.querySelector('.modal');
var close = document.querySelector('.close');

//videos
const d1 = document.querySelector('#d1');
const d2 = document.querySelector('#d2');
const d3 = document.querySelector('#d3');
const d4 = document.querySelector('#d4');
const d5 = document.querySelector('#d5');
const dC = document.querySelector('#dC');
const qR = document.querySelector('#qR');

//set varibles
//get question and answers
var a, h, q, t;
//get the wrong input and print to screen
var arrI = [];
var exarr = [];
//get the right answers
var arrRight = [];
//get correct letters
var rightL = '';
//count submit
var wtc = 0;
//cound correct answers
var correct = 0;
//Increment questions
var count = 0;

//get questions
var arrQ = ['Mexican tortillas were originally made from the grain of which plant?',
'What dish made from crushed durum wheat is a staple of western North Africa?',
'Sushi is a type of cuisine that originated in what country?'];

var arrQAH =
 [{Question: 'Mexican tortillas were originally made from the grain of which plant?',
    Answer: 'corn', Hint: 'A native American staple crop', Tries: 0 },
  {Question:'What dish made from crushed durum wheat is a staple of western North Africa?',
    Answer: 'couscous', Hint:'Not rice but like rice', Tries: 0 },
  {Question: 'Sushi is a type of cuisine that originated in what country?',
    Answer: 'japan', Hint: 'Kon nichiwa', Tries: 0 }];

/* ======= Modal ======== */
var hideModal = function (){
  modal.classList.add('hidden');
}
var showModal = function () {
  modal.classList.remove('hidden');
}

var toggleModal = function () {
  modal.classList.toggle('hidden');
}

//Directions
function toggleShow() {
  directText.classList.toggle('hidden');
  op.classList.toggle('hidden');
}

function showDirections(){
  modal.classList.remove('hidden');
}

window.onload = setTimeout(showModal, 0);

close.addEventListener('click', hideModal);

//Replay game: refreshes page
function rePlay() {
   location.reload();
}

//next button
function nextQ(){
  //next button is clicked
  clearInput();
  //if array done restart array
  if (count >= arrQAH.length) {
    count = 0;
  }
 //if all in the questions are not correct go through array again
  if(correct !== arrQ.length){
      myFunction();
  } else if(correct == arrQ.length){
    winner();
  } else {

  }
}

//start game
function myFunction() {
  let b = 0;
      b = 1;
  startBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');

  if(b === 1) {
    d1.classList.remove('hidden');
    vdc.classList.remove('hidden');
    wrapper1.classList.remove('hidden');
    question.classList.remove('hidden');
    hint.classList.remove('hidden');
    footer.classList.remove('hidden');
  }

  //get questions
  getQA();

  //get form box
  getFormBox();

  // Event Listeners
  hint.addEventListener('click', function (){
    hintTxt.textContent = h;
  });

  form.addEventListener('submit', getEachValue);

}//end myFunction()

//get question and answer: count increment questions and answers
function getQA(){
      q = arrQAH[count].Question;
      a = arrQAH[count].Answer;
      h = arrQAH[count].Hint;
      count += 1;
  question.textContent = q;
}

//create inputs form
function getFormBox(){
  for (let i= 0; i < a.length; i++) {
    var x = document.createElement("input");
        x.setAttribute("type", "text");
        x.setAttribute("placeholder", 'Input '+ (i+1));
        x.setAttribute("id", i);
        form.appendChild(x);
  }
        form.appendChild(document.createElement("br"));
        x =  document.createElement("input");
        x.setAttribute("type", "submit");
        x.setAttribute("value", "submit");
        x.setAttribute("id", "submit");
        form.appendChild(x);

} //end getFormBox()

//clear old question information
function clearInput(){
  d1.classList.remove('hidden');
  d2.classList.add('hidden');
  d3.classList.add('hidden');
  d4.classList.add('hidden');
  qR.classList.add('hidden');

   form.textContent = '';
   hintTxt.textContent = '';
   resultDiv.textContent = '';
   wrong.textContent = '';

   videoContainer.style.marginLeft = 0 + "px";

   resultDiv.classList.add('hidden');
   wrong.classList.add('hidden');
   form.classList.remove('hidden');
   hint.classList.remove('hidden');
}

//get the value of each input box
function getEachValue(event){
  event.preventDefault();

  resultDiv.classList.remove('hidden');
  wrong.classList.remove('hidden');

  arrQAH[count-1].Tries += 1;
  wtc = arrQAH[count-1].Tries;

  for(let i= 0; i < a.length; i++) {
   var d = document.getElementById(i).value;
   var b = a[i];

  if (d === b) {
    wrong.innerHTML = '';
    rightL += d;
    rightL = rightL.substring(rightL.length - a.length);
  }

  if (d !== b ) {
    resultDiv.textContent = 'The following inputs are wrong ';
    exarr[i] = d;
    arrI.push('');
    arrI[i] = arrI[i] + exarr[i];
    document.getElementById(i).value = '';
    wrong.innerHTML = '';
    drowing();
  }

  for (let i = 0; i < a.length; i++) {
    wrong.innerHTML += `<p>Input ${i+1}: ${arrI[i]}</p><br/>`;
  }

}//end for loop

if (rightL === a){
  correctA(rightL,a,q);
}
}

//checks correct questions
function correctA(answer,value,quest){

  if (answer === value) {
    d1.classList.add('hidden');
    d2.classList.add('hidden');
    d3.classList.add('hidden');
    d4.classList.add('hidden');
    qR.classList.remove('hidden');

    question.classList.add('hidden');
    form.classList.add('hidden');
    hint.classList.add('hidden');

    videoContainer.style.marginLeft = 100 + "px";

    resultDiv.textContent = a + ' is the correct answer';
    wrong.textContent = 'Awesome you solved this one, press next to continue';

    arrRight[arrRight.length] = quest;
    correct += 1;

    for (let i = 0; i < arrQAH.length; i++) {
      if(quest === arrQAH[i].Question){
        arrQAH.splice(i,1)
      }
    }
    count = 0;
  }
}

//checks if loosing
function drowing(){
  if(wtc === 6){
    d1.classList.add('hidden');
    d2.classList.add('hidden');
    d3.classList.remove('hidden');
    d4.classList.add('hidden');
    question.classList.add('hidden');
    form.classList.add('hidden');
    hint.classList.add('hidden');
    resultDiv.classList.add('hidden');
    wrong.classList.add('hidden');
    nextBtn.classList.add('hidden');

    videoContainer.style.marginLeft = 100 + "px";
  } else if (wtc > 3) {
    d1.classList.add('hidden');
    d2.classList.remove('hidden');
    d3.classList.add('hidden');
    d4.classList.add('hidden');
  } else if (wtc === 3) {
    d1.classList.add('hidden');
    d2.classList.remove('hidden');
    d3.classList.add('hidden');
    d4.classList.add('hidden');
  } else if (wtc < 3) {
    d1.classList.remove('hidden');
    d2.classList.add('hidden');
    d3.classList.add('hidden');
    d4.classList.add('hidden');
  } else {

  }
}

//if correct = array.length, then display winner video
function winner(){
    wrapper1.classList.add('hidden');
    question.classList.add('hidden');
    hint.classList.add('hidden');
    nextBtn.classList.add('hidden');

    d1.classList.add('hidden');
    d2.classList.add('hidden');
    d3.classList.add('hidden');
    d4.classList.remove('hidden');
    resultDiv.textContent = 'The Winner is You!!!';
    wrong.textContent = '';

    videoContainer.style.marginLeft = 100 + "px";

}

function credits(){
  dC.classList.remove('hidden');
  setTimeout(showModal, 1000);
}
