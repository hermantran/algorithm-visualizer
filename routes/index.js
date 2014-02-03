
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { 
    title: 'Home',
    algorithms: res.app.settings['src'].algorithms
  });
};

exports.partials = function(req, res) {
  res.render('partials/' + req.params.name, {});
};