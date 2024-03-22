import React, { useState } from 'react';
import { Paper, Typography, Divider, Grid, Button, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import './CoffeeQuiz.css';

function CoffeeQuiz() {
  // Define an array of coffee types for the quiz
  const coffeeTypes = [
    {
      name: 'Espresso',
      description: 'A concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans.',
      choices: ['Espresso', 'Cappuccino', 'Latte', 'Americano'],
      correctChoice: 'Espresso',
    },
    {
      name: 'Cappuccino',
      description: 'Espresso mixed with steamed milk and topped with foam. Often sprinkled with cocoa powder or cinnamon.',
      choices: ['Cappuccino', 'Macchiato', 'Mocha', 'Latte'],
      correctChoice: 'Cappuccino',
    },
    {
      name: 'Latte',
      description: 'Similar to a cappuccino, but with more steamed milk and less foam. Often served in a glass.',
      choices: ['Americano', 'Macchiato', 'Latte', 'Mocha'],
      correctChoice: 'Latte',
    },
    {
      name: 'Americano',
      description: 'A diluted espresso, made by adding hot water to espresso shots. It has a similar strength to drip coffee but a different flavor profile.',
      choices: ['Latte', 'Americano', 'Espresso', 'Macchiato'],
      correctChoice: 'Americano',
    },
    {
      name: 'Macchiato',
      description: 'An espresso with a small amount of milk or foam, creating a "stained" or "marked" coffee.',
      choices: ['Espresso', 'Macchiato', 'Mocha', 'Cappuccino'],
      correctChoice: 'Macchiato',
    },
    {
      name: 'Mocha',
      description: 'A chocolate-flavored variant of a latte, typically with chocolate syrup or cocoa powder added to espresso and steamed milk.',
      choices: ['Mocha', 'Cappuccino', 'Espresso', 'Americano'],
      correctChoice: 'Mocha',
    },
  ];

  // State to track current question index and user's selected choice for each question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userChoices, setUserChoices] = useState(new Array(coffeeTypes.length).fill(null));
  const [showConfetti, setShowConfetti] = useState(false);

  // Function to handle selecting a choice
  const handleSelectChoice = (event) => {
    const choiceIndex = parseInt(event.target.value, 10);
    const newUserChoices = [...userChoices];
    newUserChoices[currentQuestion] = choiceIndex;
    setUserChoices(newUserChoices);
  };

  // Function to handle the next question
  const handleNextQuestion = () => {
    if (currentQuestion === coffeeTypes.length - 1) {
      setShowConfetti(true);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  // Function to handle restarting the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserChoices(new Array(coffeeTypes.length).fill(null));
    setShowConfetti(false);
  };

  // Determine if all questions are answered correctly
  const allCorrect = userChoices.every((choice, index) => choice === coffeeTypes[index].choices.indexOf(coffeeTypes[index].correctChoice));

  // Render the quiz question
  return (
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top: '64px',
        left: 0,
        width: '100%',
        height: 'calc(100% - 64px)',
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/025/939/952/large_2x/minimal-interior-design-coffee-cafe-bar-shop-with-beige-cozy-tone-style-and-with-glossy-ivory-white-round-corner-counter-coffee-machinery-with-generative-ai-free-photo.jpeg")', // Corrected background image URL
        backgroundSize: 'cover',
        overflow: 'auto',
        padding: '20px',
      }}
    >
      {showConfetti && <div className="confetti" />}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '50%', height: '50%' }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom style={{ color: '#3E2723', fontWeight: 'bold' }}>
            Coffee Quiz
          </Typography>
          <Divider style={{ margin: '10px 0', backgroundColor: '#3E2723' }} />
          {currentQuestion < coffeeTypes.length ? (
            <>
              <Typography variant="body1" paragraph style={{ color: '#3E2723', fontWeight: 'bold' }}>
                What type of coffee is described below?
              </Typography>
              <Typography variant="body1" paragraph style={{ color: '#3E2723' }}>
                {coffeeTypes[currentQuestion].description}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="coffee-type"
                  name="coffee-type"
                  value={userChoices[currentQuestion]}
                  onChange={handleSelectChoice}
                >
                  {coffeeTypes[currentQuestion].choices.map((choice, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={choice} />
                  ))}
                </RadioGroup>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleNextQuestion} style={{ marginTop: '130px' }}>
                {currentQuestion === coffeeTypes.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" paragraph style={{ color: '#3E2723', fontWeight: 'bold' }}>
                {allCorrect ? 'Congratulations! You have completed the quiz.' : 'Quiz Results'}
              </Typography>
              {!allCorrect && (
                <>
                  <Typography variant="body1" paragraph style={{ color: '#3E2723' }}>
                    You answered {userChoices.filter((choice, index) => choice === coffeeTypes[index].choices.indexOf(coffeeTypes[index].correctChoice)).length} out of {coffeeTypes.length} questions correctly.
                  </Typography>
                </>
              )}
              <Button variant="contained" color="primary" onClick={handleRestartQuiz}>
                Restart Quiz
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CoffeeQuiz;
