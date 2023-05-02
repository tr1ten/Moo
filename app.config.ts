import 'dotenv/config';

export default {
  expo: {
    extra: {
      // Add your extra configs here
      apiKey: process.env.BASE_URL,
    }
  }
};