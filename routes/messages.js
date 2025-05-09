import express from 'express';

const router = express.Router();

// In-memory message stare
const messages = [
    {
        id: 1,
        text: "Hi there!",
        user: "Amanda",
        added: new Date()
    },
    {
        id: 2,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

// GET / --> list of messages
router.get('/', (req, res) => {
    res.render('index', { title: 'Mini Message Board', messages: messages.slice().reverse() });
});

// GET /new --> show new message form
router.get('/new', (req, res) => {
    res.render('form', { title: 'Add a New Message' });
});

// POST /new --> handle form submit
router.post('/new', (req, res) => {
    const { user, message } = req.body;

    // Basic validation
    if (!user?.trim() || !message?.trim()) {
        return res.status(400).render('form', {
            title: 'Add a New Message',
            error: 'Both fields are required',
        });
    }

    const id = messages.length ? messages[messages.length - 1].id + 1 : 1;
    messages.push({
        id,
        text: message.trim(),
        user: user.trim(),
        added: new Date()
    });
    
    res.redirect('/');
});

router.get('/message/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10);
    const message = messages.find(msg => msg.id === messageId);

    if (!message) {
        return res.status(404).send('Message not found.');
    }

    res.render('detail', {title: 'Message Detail', message});
});

export default router;
