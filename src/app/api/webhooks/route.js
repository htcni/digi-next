import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/app/pricing/utils/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  const headerList = headers();
  const signature = headerList.get('stripe-signature');
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, signingSecret);
  } catch (error) {
    console.log(error);
    console.log('Webhook signature failed');
    return NextResponse.json({ status: 400 }).end();
  }

  try {
    switch (event.type) {
      case 'customer.subscription.updated':
        await updateSubscription(event);
        break;
      case 'customer.subscription.deleted':
        await deleteSubscription(event);
        break;
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}

const updateSubscription = async (event) => {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('stripe_customer_id', stripe_customer_id)
    .single();

  if (profile) {
    const updatedSubscription = {
      subscription_status,
      price,
    };

    await supabase
      .from('profile')
      .update(updatedSubscription)
      .eq('stripe_customer_id', stripe_customer_id);
  } else {
    const customer = await stripe.customers.retrieve(stripe_customer_id);
    const name = customer.name;
    const email = customer.email;

    const newProfile = {
      name,
      email,
      stripe_customer_id,
      subscription_status,
      price,
    };

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile,
    });

    const { err } = await supabase
      .from('profile')
      .insert([{ ...newProfile, user_id: data.user.id }]);
    console.log(err);
  }
};

async function deleteSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const deletedSubscription = {
    subscription_status,
    price: null,
  };

  await supabase
    .from('profile')
    .update(deletedSubscription)
    .eq('stripe_customer_id', stripe_customer_id);
}
