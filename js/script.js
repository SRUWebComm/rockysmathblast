//stopwatch by electricg
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};

var x = new clsStopwatch();
var $time;
var clocktimer;

function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

function show() {
	$time = document.getElementById('time');
	update();
}

function update() {
	$time.innerHTML = formatTime(x.time());
}

function start() {
	clocktimer = setInterval("update()", 1);
	x.start();
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
}

function reset() {
	stop();
	x.reset();
	update();
}

function startMath(difficulty)
{
	if (difficulty == "easy")
	{
		easyDif();
	}
	else if (difficulty == "medium")
	{
		medDif();
	}
	else if (difficulty == "hard")
	{
		hardDif();
	}
}
var correctAnswers = [false,false,false,false,false,false,false,false,false,false];
var numCorrect = [];
var tenouttaten = false;
function easyDif ()
{
	var i = 1;
	var randomNum1
	var randomNum2
	var questionNum = "";
	for (i=0;i<=9;i++)
	{
		randomNum1 = Math.floor(Math.random()*(10)+1);
		randomNum2 = Math.floor(Math.random()*(10)+1);
		questionNum = "question"+(i+1);
		document.getElementById(questionNum).innerHTML = randomNum1 + " + " + randomNum2 + " =   " ;
		correctAnswers[i]=(randomNum1+randomNum2);
	}	
	//alert(correctAnswers);
}
function medDif()
{

}
function hardDif()
{

}
function stopMath()
{
	var answerNum = "";
	var counterCorrect = 0;
	for (i=0;i<=9;i++)
	{
		answerNum="text"+(i+1);
		if(correctAnswers[i] == document.getElementById(answerNum).value)
		{
			numCorrect[i] = true;
		}
		else
		{
			numCorrect[i] = false;
		}
	}
	//alert(numCorrect);
	for (j=0;j<=9;j++)
	{
		if(numCorrect[j] === true)
		{
			counterCorrect++;
		}
	}
	//alert(counterCorrect);
	if (counterCorrect == 10)
	{
		document.getElementById("outputDiv").innerHTML = "Congradulations you've got 10/10 correct!";
	}
	else
	{
		document.getElementById("outputDiv").innerHTML = "You've got " + counterCorrect + " out of 10 correct";
	}
}