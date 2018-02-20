var shell = require('shelljs');
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}


shell.cp('-Ru', './node_modules/bootstrap/*', './src/client/public/bootstrap');
shell.cp('-Ru', './src/client/styles/*', './src/client/public/styles');