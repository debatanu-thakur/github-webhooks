require('dotenv').config()
module.exports = {
  apps : [{
    name: 'Webhooks',
    script: './webhook.js',


    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      SECRET: process.env.SECRET
    }
  }],

  deploy : {
    production : {
      user : process.env.HOST_USER,
      host : process.env.HOST,
      ref  : 'origin/master',
      ssh_options: `StrictHostKeyChecking=no`,
      repo : process.env.REPO,
      path : `${process.env.DEST_PATH}${process.env.PART_PATH}`,
      'post-deploy' : `npm install && SECRET=${process.env.WEBHOOK_SECRET} pm2 reload ecosystem.config.js --env production`
    }
  }
};
