import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fischl-identity';

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(uri, { maxPoolSize: 5 });
};
