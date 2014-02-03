module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['public/js/**/*.js', '!**/*.min.js']  
    },
    
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['jshint']);
};