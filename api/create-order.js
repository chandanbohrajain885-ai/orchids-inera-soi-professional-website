// Vercel Serverless Function — POST /api/create-order
// Creates a Razorpay order for the payment flow

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { amount, currency, receipt } = req.body || {};

    if (!amount || amount <= 0) {
      res.status(400).json({ error: 'Invalid amount' });
      return;
    }

    const RAZORPAY_KEY_ID = process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T0FdwnC16Luy4y';
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_KEY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET is not set in environment variables');
      res.status(500).json({ error: 'Payment gateway not configured' });
      return;
    }

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects paise
        currency: currency || 'INR',
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1,
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Razorpay order creation failed:', JSON.stringify(order));
      res.status(500).json({
        error: order.error?.description || 'Failed to create order',
        details: order,
      });
      return;
    }

    res.status(200).json({ ok: true, order });
  } catch (e) {
    console.error('Order creation error:', e);
    res.status(500).json({ error: 'Server error creating order' });
  }
}