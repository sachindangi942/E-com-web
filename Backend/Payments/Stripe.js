const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
    payment_method_types: ['card'],
  });
};

module.exports = {
  createPaymentIntent,
};
