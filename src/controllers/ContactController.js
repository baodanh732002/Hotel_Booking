class ContactController {
  // [GET] /contact
  async index(req, res) {
    const user = req.session.user || null;
    res.render("contact", { user, header: "header" });
  }
}

module.exports = new ContactController();
