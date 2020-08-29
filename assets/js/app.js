$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
        question: "What is supposedly always in the banana stand?",
        choices: ["phone", "money", "keys", "wallet"],
	    correctAnswer: "money",
	    image: "<img src='assets/images/q1.jpeg' class='img-circle shadow'>"
	  }, 
	  
	  {
	    question: "Which actor won a Golden Globe in 2005 for his performance on the show?",
    choices: ["Jason Bateman", "Alia Shawkat", "Will Arnett", "Jeffrey Tambor"],
    correctAnswer: "Jason Bateman",
	    image: "<img src='assets/images/q2.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question:"What bites off Buster's hand?",
    choices: ["A dog", "George Michael", "A loose seal", "Lucille II"],
    correctAnswer: "A loose seal",
	    image: "<img src='assets/images/q3.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What vehicle does Gob use for transportation?",
    choices: ["Car", "Segway", "Bicycle", "Stair Car"],
    correctAnswer: "Segway",
	    image: "<img src='assets/images/q4.jpeg' class='img-circle shadow'>"
	  },
	  {
	    question: "Who is George Bluth's twin brother?",
    choices: ["Bob Loblaw", "Tobias Funke", "Barry Zuckerhorn", "Oscar George Bluth"],
    correctAnswer: "Oscar George Bluth",
	    image: "<img src='assets/images/q5.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "What Vegas act does Tobias attempt to join?",
    choices: ["Cirque du Soleil", "Celine Dion", "Blue Man Group", "Penn and Teller"],
    correctAnswer: "Blue Man Group",
	    image: "<img src='assets/images/q6.png' class='img-circle shadow'>"
	  },
	  {
	    question: "What star of stage and film plays Lucille Austero?",
    choices: ["Liza Minnelli", "Patty Lupone", "Alan Cumming", "Bernadette Peters"],
    correctAnswer: "Liza Minnelli",
	    image: "<img src='assets/images/q7.jpeg' class='img-circle shadow'>"
	  },
	  {
	    question: "What pharmaceutical did the Funke family promote?",
    choices: ["Benzozine", "Euphoriazine", "Joyazine", "Happyzine"],
    correctAnswer: "Euphoriazine",
	    image: "<img src='assets/images/.jpeg' class='img-circle shadow'>"
	  }
	    ];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "And that's why you always leave a note!";
			var bottomText = "There are dozens of us! Dozens!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "She thinks I'm too critical.  That's another fault of hers.";
			var bottomText = "You're telling me there's no alcohol?";
		}
		else {
			var endMessage = "I've made a huge mistake.";
			var bottomText = "Has anyone in this famiy even seen a chicken?";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});