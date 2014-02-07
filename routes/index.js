
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { 
    title: 'Algorithm Visualizer',
    description: 'Data visualization for common sorting algorithms'
  });
};

exports.partials = function(req, res) {
  res.render('partials/' + req.params.name, {
    algorithms: res.app.settings['src'].algorithms
  });
};