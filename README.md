# Open a shell to Snap!

How to use this repository:


First push this app to heroku, this will be deployed to https://APP_NAME.herokuapp.com

    $ git clone https://github.com/ketan/snap-debug
    $ heroku create APP_NAME
    $ git push heroku master


In Snap, create a build plan with the following:

    $ curl https://APP_NAME.herokuapp.com/debug | bash

When you run the build, this will show instructions on how to debug the build
