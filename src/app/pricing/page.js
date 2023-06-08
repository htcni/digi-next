import Benefits from './components/Benefits';
import { Plans } from './components/Plans';
import { stripe } from './utils/stripe';

export const revalidate = 60;

const PricingPage = async () => {
  const { data: prices } = await stripe.prices.list();
  const plans = [];

  for (const price of prices) {
    const product = await stripe.products.retrieve(price.product);
    plans.push({
      name: product.name,
      id: price.id,
      price: price.unit_amount / 100,
      interval: price.recurring.interval,
    });
  }
  return (
    <div className='h-full grid grid-cols-1 lg:grid-cols-2'>
      <Plans plans={plans} />
      <Benefits />
    </div>
  );
};

export default PricingPage;
