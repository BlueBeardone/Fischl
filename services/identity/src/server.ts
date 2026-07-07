import { createApp } from './app';

const port = Number(process.env.PORT || 3001);

createApp()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Identity service listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start identity service', error);
    process.exit(1);
  });
