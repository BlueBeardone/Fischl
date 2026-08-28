import { createApp } from './app';

const port = Number(process.env.PORT || 3003);

createApp()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Newspapers service listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start newspapers service', error);
    process.exit(1);
  });
