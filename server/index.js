const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const escrowTransactions = {};

app.post('/api/escrow', (req, res) => {
  const { propertyId, tenantId, landlordId, amount } = req.body;
  const transactionId = `txn_${Date.now()}`;
  escrowTransactions[transactionId] = {
    propertyId,
    tenantId,
    landlordId,
    amount,
    status: 'initiated',
  };
  res.json({ transactionId, status: 'initiated' });
});

app.get('/api/escrow/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  const transaction = escrowTransactions[transactionId];
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

app.put('/api/escrow/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;
  const transaction = escrowTransactions[transactionId];
  if (transaction) {
    transaction.status = status;
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
