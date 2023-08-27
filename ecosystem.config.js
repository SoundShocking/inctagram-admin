module.exports = {
  apps: [
    {
      name: 'admin.cygan.lol',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      restartDelay: 1000,
      instances: 1,
      autorestart: true,
    },
  ],
}
