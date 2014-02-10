module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['public/js/**/*.js', '!**/lib/*.js', '!**/*.min.js']  
    },
    
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/styles.min.css': ['public/css/sass/main.scss']  
        }
      }
    },
    
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      scss: {
        files: ['public/css/sass/*.scss'],
        tasks: ['sass']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  grunt.registerTask('default', ['jshint', 'sass']);
};