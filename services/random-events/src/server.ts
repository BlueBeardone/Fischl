import { createApp } from './app';

const port = Number(process.env.PORT || 3004);

createApp()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Random events service listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start random events service', error);
    process.exit(1);
  });
