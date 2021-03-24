const router = require("express").Router();
const { Journal, User, Comments } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const journalData = await Journal.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "entry", "title", "date_created"],
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Comments,
          attributes: ["id", "entry", "user_id", "blog_id", "date_created"],
          include: {
            model: User,
            attributes: ["name"],
          }
        }]
    })

    console.log(journalData);
    if (!journalData){
    res.status(404).json({ message: 'id doesnt exist'});
    return;
    }
    const journal = journalData.get({ plain: true});
    console.log(journal);
    res.render('singlePost', {
    journal,
    loggedIn: req.session.logged_in
    })
  } catch (err) { 
      res.status(500).json(err)
      };
})

router.post('/:id', async (req, res) => {
  const user_id = req.session.user_id
  try {
    const comment = await Comments.create({
      entry: req.body.text,
      journal_id: req.body.journal_id,
      user_id: user_id
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post("/", async (req, res) => {
  try {
    const newJournal = await Journal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newJournal);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const journalData = await Journal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!journalData) {
      res.status(404).json({ message: "No entry found with this id!" });
      return;
    }

    res.status(200).json(journalData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
