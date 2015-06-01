/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    connections:{
        prodMongodbServer: {
            adapter: 'sails-mongo',
            url: 'mongodb://heroku_app37390017:vhi77pjta4jbhubd38rn4k2995@ds043012.mongolab.com:43012/heroku_app37390017'
        }
    },

    models:{
        connection: 'prodMongodbServer'
    }
};
