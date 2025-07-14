const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = {};
const escrowTransactions = {};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({ username }, 'secret');
    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/escrow', authenticateJWT, (req, res) => {
  const { propertyId, amount } = req.body;
  const transactionId = `txn_${Date.now()}`;
  escrowTransactions[transactionId] = {
    propertyId,
    tenantId: req.user.username,
    landlordId: 'landlord456', // Replace with actual landlord ID
    amount,
    status: 'initiated',
  };
  res.json({ transactionId, status: 'initiated' });
});

app.get('/api/escrow/:transactionId', authenticateJWT, (req, res) => {
  const { transactionId } = req.params;
  const transaction = escrowTransactions[transactionId];
  if (transaction && transaction.tenantId === req.user.username) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

app.put('/api/escrow/:transactionId', authenticateJWT, (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;
  const transaction = escrowTransactions[transactionId];
  if (transaction && transaction.tenantId === req.user.username) {
    transaction.status = status;
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const chatHistory = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join room', (propertyId) => {
    socket.join(propertyId);
    if (chatHistory[propertyId]) {
      socket.emit('chat history', chatHistory[propertyId]);
    }
  });

  socket.on('chat message', ({ propertyId, msg }) => {
    if (!chatHistory[propertyId]) {
      chatHistory[propertyId] = [];
    }
    chatHistory[propertyId].push(msg);
    io.to(propertyId).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
