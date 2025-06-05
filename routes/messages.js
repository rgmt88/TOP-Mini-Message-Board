import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET / --> list of messages
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM messages ORDER BY added DESC');
    res.render('index', { title: 'Mini Message Board', messages: result.rows });
});

// GET /new --> show new message form
router.get('/new', (req, res) => {
    res.render('form', { title: 'Add a New Message' });
});

// POST /new --> handle form submit
router.post('/new', async (req, res) => {
    const { user, message } = req.body;

    // Basic validation
    if (!user?.trim() || !message?.trim()) {
        return res.status(400).render('form', {
            title: 'Add a New Message',
            error: 'Both fields are required',
        });
    }

    await pool.query(
        'INSERT INTO messages (text, user_name) VALUES ($1, $2)',
        [message.trim(), user.trim()]
    );
    
    res.redirect('/');
});

router.get('/message/:id', async (req, res) => {
    const messageId = parseInt(req.params.id, 10);
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);

    if (!result.rows.length) {
        return res.status(404).send('Message not found.');
    }

    res.render('detail', { title: 'Message Detail', message: result.rows[0] });
});

export default router;
