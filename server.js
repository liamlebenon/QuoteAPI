const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

// Get Routes

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    const { quote, person } = randomQuote;
    res.send({
        quote: {
            quote: quote,
            person: person
        }
    });
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        const quotesByPerson = quotes.filter((quote) => {
            return quote.person === req.query.person;
        });
        res.send({
            quotes: quotesByPerson
        });
    } else {
        res.send({
            quotes: quotes
        });
    }
});

// Post Routes

app.post('/api/quotes', (req, res) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };

    if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    } else {
        res.status(400).send();
    }
});


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

app.use(express.static('public'));

