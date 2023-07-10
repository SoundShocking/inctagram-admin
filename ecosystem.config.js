module.exports = {
  apps: [
    {
      name: 'front-admin',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      restartDelay: 1000,
      instances: 1,
      autorestart: true,
    },
  ],
}
