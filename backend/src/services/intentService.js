
const intents = {
  refund:           ['refund', 'money back', 'return', 'reimburse'],
  login_issue:      ['cant login', 'login problem', 'password reset', 'forgot password', 'sign in'],
  payment_issue:    ['payment failed', 'charge', 'billing', 'invoice', 'not charged', 'transaction'],
  order_tracking:   ['track order', 'where is my order', 'shipping', 'delivery', 'order status'],
  technical:        ['not working', 'error', 'bug', 'crash', 'broken', 'issue', 'problem'],
  account_issue:    ['account', 'profile', 'settings', 'email change', 'delete account'],
};

const angryWords = ['angry', 'furious', 'terrible', 'worst', 'hate', 'useless', 'scam', 'fraud'];

export const  detectIntent = (message) => {
  const clean = message.toLowerCase().replace(/[^\w\s]/g, '');
  const words = clean.split(' ');

  let bestIntent = 'unknown';
  let highestScore = 0;

  for (const [intent, keywords] of Object.entries(intents)) {
    const score = keywords.filter(k => clean.includes(k)).length;
    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }
  
  const isAngry = angryWords.some(w => clean.includes(w));
  const confidence = highestScore > 0 ? highestScore / 3 : 0; 

  return { intent: bestIntent, confidence, isAngry };
};