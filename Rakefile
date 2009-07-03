require 'rubygems'
require 'rake'
require 'rake/clean'

APP_VERSION  = '1.0.0'
APP_NAME     = 'threaded-gtalk-gmscript'
APP_FILE_NAME= "threaded-gtalk.user.js"

APP_ROOT     = File.expand_path(File.dirname(__FILE__))
APP_SRC_DIR  = File.join(APP_ROOT, 'public')
APP_DIST_DIR = File.join(APP_ROOT, 'website', 'dist')


task :default => [:dist, :package, :clean_package_source]

desc "Builds the distribution"
task :dist => [:build] do
  mkdir_p(APP_DIST_DIR)
  sh "cp -R #{APP_SRC_DIR}/* #{APP_DIST_DIR}/"
end

desc "Builds the compiled JS file that is downloaded by greasemonkey script"
task :build do
  files = %w[jquery jquery.noConflict threaded_gtalk threaded_gtalk_theme]
  content = files.map { |file| File.read(File.join(APP_SRC_DIR, file + ".js")) }.join("\n\n")
  File.open(File.join(APP_SRC_DIR, "threaded_gtalk_complete.js"), "w") do |file|
    file << content
  end
end
