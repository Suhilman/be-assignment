import app from './app';

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`Account Manager service is running on port ${PORT}`);
});
