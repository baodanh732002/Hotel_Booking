class AboutController {
  // [GET] /booking
  async index(req, res) {
    const user = req.session.user || null;
    res.render("about", { user, header: "header" });
  }
}

module.exports = new AboutController();
