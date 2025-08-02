const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// History fallback must come BEFORE static
app.use(history());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
