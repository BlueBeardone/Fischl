import { createApp } from './app';

const port = Number(process.env.PORT || 3002);

createApp()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Bastions service listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start bastions service', error);
    process.exit(1);
  });
