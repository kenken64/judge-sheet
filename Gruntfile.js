const mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './public/min-safe/app/app.config.js': ['./public/app/app.config.js'],
                    './public/min-safe/app/services/api.services.js': ['./public/app/services/api.services.js'],
                    './public/min-safe/app/admin/admin.controller.js': ['./public/app/admin/admin.controller.js'],
                    './public/min-safe/app/admin/batchruns.controller.js': ['./public/app/admin/batchruns.controller.js'],
                    './public/min-safe/app/admin/judges.controller.js': ['./public/app/admin/judges.controller.js'],
                    './public/min-safe/app/compute/compute.controller.js': ['./public/app/compute/compute.controller.js'],
                    './public/min-safe/app/judge/judge.controller.js': ['./public/app/judge/judge.controller.js'],
                    './public/min-safe/app/shared/header.controller.js': ['./public/app/shared/header.controller.js'],
                    './public/min-safe/app/sheet/sheet.controller.js': ['./public/app/sheet/sheet.controller.js'],
                    './public/min-safe/app/app.module.js': ['./public/app/app.module.js']   
                }
            }
        },
        concat: {
            js: { //target
                src: ['./public/min-safe/app/app.module.js', './public/min-safe/app/**/*.js'],
                dest: './public/min/app.js'
            }
        },
        uglify: {
            js: { //target
                src: ['./public/min/app.js'],
                dest: './public/min/app.js'
            }
        },
        pagespeed: {
            options: {
              nokey: true,
              url: "https://developers.google.com"
            },
            prod: {
              options: {
                url: "https://young-spire-24679.herokuapp.com/#!/home",
                locale: "en_GB",
                strategy: "desktop",
                threshold: 80
              }
            }
          },
          imagemin: {
            static: {
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()] // Example plugin usage
                },
                files: {
                    './public/assets/dist/avatar.png': './public/assets/images/avatar.png',
                    './public/assets/dist/background.jpg': './public/assets/images/background.jpg',
                    './public/assets/dist/result.png': './public/assets/images/result.png',
                    './public/assets/dist/running_man-512.png': './public/assets/images/running_man-512.png'
                }
            }
        }
        
      });

      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-ng-annotate'); 
      grunt.loadNpmTasks('grunt-pagespeed');
      grunt.loadNpmTasks('grunt-contrib-imagemin');

      // Default task(s).
      grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify', 'pagespeed', 'imagemin']);
    
    };