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
task :dist => [:build, :update_bookmarklet] do
  mkdir_p(APP_DIST_DIR)
  sh "cp -R #{APP_SRC_DIR}/* #{APP_DIST_DIR}/"
end

desc "Builds the compiled JS file that is downloaded by greasemonkey script"
task :build do
  files = %w[jquery jquery.noConflict threaded_gtalk threaded_gtalk_theme]
  content = files.map { |file| File.read(File.join(APP_SRC_DIR, file + ".js")) }.join("\n\n")
  File.open(File.join(APP_SRC_DIR, "threaded_gtalk_complete.js"), "w") do |file|
    # file << "(function() {\n"
    file << content
    # file << "}());"
  end
end

desc "Updates the bookmarklet snippet in spec/fixtures/bookmarklet.html and website/index.html"
task :update_bookmarklet do
  gem 'hpricot'
  require 'hpricot'
  gem 'jsmin'
  require 'jsmin'

  files = {
    :local => %w[spec/fixtures/bookmarklet.html],
    :production => %w[website/index.html]
  }
  files.each do |type_files|
    type, files = type_files

    bookmarklet_file = case type
    when :local
      File.read("public/ninja-search.local.bookmarklet.js")
    when :production
      File.read("public/ninja-search.bookmarklet.js")
    end
    bookmarklet = JSMin.minify(bookmarklet_file).strip.gsub(/"/, "'")
    files.each do |file|
      doc = Hpricot(open(file))
      found = false
      doc.search('a#bookmarklet').each do |link|
        link.set_attribute :href, "javascript:#{bookmarklet}"
        found = true
      end
      if found
        File.open(file, "w") { |file| file << doc.to_s }
      else
        puts "no a#bookmarklet link in file #{file}"
      end
    end
  end
end

namespace 'github' do
  namespace 'pages' do
    desc "Setup 'website' as submodule to gh-pages, if it already exists"
    task :setup_submodule do
      current_branch = `git branch | grep "^*" | sed -e "s/* //"`.strip
      repo = `git config --list | grep "^remote.origin.url" | sed -e "s/remote.origin.url=//"`.strip
      puts "Working in #{current_branch} branch of #{repo}:"
      commands = <<-CMD.gsub(/^      /, '')
      git submodule add -b gh-pages #{repo} website
      git commit -a -m "website -> gh-pages folder"
      git push
      CMD
      commands.split(/\n/).each { |cmd| sh cmd }
    end
  end
end
