module.exports = {
  apps : [{
    name: "jobs",
    cwd: ".",
    script: './server.js',
    watch: ".",
    ignore_watch:["pm2"],
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    node_args: "-r dotenv/config",
    args: "dotenv_config_path=./.env",
    max_memory_restart: '700M',
    exp_backoff_restart_delay: 200,
    max_restarts: 25,
    out_file: './pm2/logs/jobs.log', 
    error_file: './pm2/error_logs/jobs_error.log',
  }]
};
