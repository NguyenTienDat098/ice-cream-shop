class SiteController{
	home(req, res){
		res.send('home page')
	}
}
module.exports = new SiteController;