const router = require('express').Router();
const { Journal, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('homepage reached');
  try {
    // Get all projects and JOIN with user data
    const journalData = await Journal.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const journals = journalData.map((journal) => journal.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      journals, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/journal/:id', async (req, res) => {
  try {
    const journalData = await Journal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const journal = journalData.get({ plain: true });

    res.render('journal', {
      ...journal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/User', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Journal }],
    });

    const user = userData.get({ plain: true });

    res.render('journal', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/journal');
    return;
  }

  res.render('login');
});

module.exports = router;