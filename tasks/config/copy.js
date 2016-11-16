/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/public'
      }]
    },
    node: {
      files: [{
        expand: true,
        src: ['./node_modules/angular-messages/angular-messages.min.js',
              './node_modules/angular-aria/angular-aria.min.js',
              './node_modules/angular-animate/angular-animate.min.js',
              './node_modules/angular-material/angular-material.min.js',
              './node_modules/angular-cookies/angular-cookies.min.js',
              './node_modules/angular-modal-service/dst/angular-modal-service.min.js',
              './node_modules/angular-ui-bootstap/dist/ui-bootstrap.js',
              './node_modules/angular-sanitize/angular-sanitize.min.js',
              './node_modules/showdown/dist/showdown.min.js'
              ],
        dest: '.tmp/public/js/dependencies'
      }]
    },
    nodecs: {
      files: [{
        expand: true,
        src: ['./node_modules/angular-material/angular-material.min.css',
              '.node_modules/angular-ui-bootstap/dist/ui-bootstrap.css'],
        dest: '.tmp/public/styles'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
