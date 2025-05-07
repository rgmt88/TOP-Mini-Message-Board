import express from 'express';

const router = express.Router();

// In-memory message stare
const messages = [
    {
        text: "Hi there!",
        user: "Amanda",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

// GET / --> list of messages
router.get('/', (req, res) => {
    res.render('index', { title: 'Mini Message Board', messages });
});

// GET /new --> show new message form
router.get('/new', (req, res) => {
    res.render('form', { title: 'Add a New Message' });
});

// POST /new --> handle form submit
router.post('/new', (req, res) => {
    const { user, message } = req.body;
    messages.push({ text: message, user, added: new Date() });
    res.redirect('/');
});

export default router;
