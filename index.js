//set constants
const btn = document.getElementById('btn');
const startBtn = document.querySelector('#startBtn');
const nextBtn = document.querySelector('#nextBtn');
const wrapper1 = document.querySelector('.wrapper1');
const footer = document.querySelector('.footer');
const hint = document.querySelector('.hint');
//const hint = document.querySelector('.hint');
const form = document.forms[0];
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const resultDiv = document.getElementById('result');
const wrong = document.getElementById('wrong');
const vdc = document.getElementById('vdc');

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

//set varibles
//get question and answers
var q, a, h;
//get the wrong input and print to screen
var arrI = [];
var exarr = [];
//get the right answers
var arrRight = [];
var arrWrong = [];
//print out wrong letters
var wrongL = '';
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
var arrA = ['corn', 'couscous', 'japan'];
var arrH = ['A native American staple crop', 'Not rice but like rice', 'Kon nichiwa'];

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

function showDirections(){
  modal.classList.remove('hidden');

}

close.addEventListener('click', hideModal);

//set start of game
function startGame() {

}

//next button
function nextQ(){
  //next button is clicked
  clearInput();

  if(count <= arrQ.length){
    myFunction();
  } else {
    winner();
  }
}

//start game
function myFunction() {
  let b = 0;
      b += 1;
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

  getQA();
  getFormBox();

  // Event Listeners
  hint.addEventListener('click', function (){
    hint.textContent = h;
  })
  form.addEventListener('submit', getEachValue);


}//end myFunction()

//get question and answer: count increment questions and answers
function getQA(){
      q = arrQ[count];
      a = arrA[count];
      h = arrH[count];
  question.textContent = q;
  count += 1;
}

//create inputs for form
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

//clear old question boxes form
function clearInput(){
  for (let i= 0; i < a.length; i++) {
   var e = document.getElementById(i);
   form.removeChild(e);
 }
   e = document.getElementById('submit');
   form.removeChild(e);

   resultDiv.textContent = '';
   wrong.textContent = '';
}

//get the value of each input box
function getEachValue(event){
  event.preventDefault();

  resultDiv.classList.remove('hidden');
  wrong.classList.remove('hidden');

  wtc += 1;

  for(let i= 0; i < a.length; i++) {
   var d = document.getElementById(i).value;
   var b = a[i];

  if (d !== b ) {
    resultDiv.textContent = 'The following inputs are wrong ';
    wrongL += d;
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

  if (d === b) {
    resultDiv.textContent = a + ' is the correct answer';
    wrong.textContent = 'Awesome you solved this one, press next to continue';
  }
 correctA(d,b,q);
}

function correctA(answer,value,question){
  if (answer === value) {
    //arrRight.push(question);
    arrRight[arrRight.length] = question;
    correct += 1;
  }
}

//change video if loosing
function drowing(){
  if(wtc === 6){
    d1.classList.add('hidden');
    d2.classList.add('hidden');
    d3.classList.remove('hidden');
    d4.classList.add('hidden');
  }
  if (wtc === 3) {
    d1.classList.add('hidden');
    d2.classList.remove('hidden');
    d3.classList.add('hidden');
    d4.classList.add('hidden');
  }
}

//if correct = array.length, then display winner video
function winner(){
  if (correct === arrQ.length) {
    wrapper1.classList.add('hidden');
    question.classList.add('hidden');
    hint.classList.add('hidden');

    d1.classList.add('hidden');
    d2.classList.add('hidden');
    d3.classList.add('hidden');
    d4.classList.remove('hidden');
    resultDiv.textContent = 'The Winner is You!!!';
    wrong.textContent = '';
  } else {
    //start over from questions unanswered, or didn't finish
    for (let i = 0; i<arrQ.length; i++) {
      if (arrQ[i] !== arrRight[i]){
        arrWrong[i].push(arrQ[i]);
      }
      q = arrWrong[i];
    }
    getFormBox();
  }

}
