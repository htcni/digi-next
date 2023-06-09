import { SITE_URL } from '@/app/core/utils';
import { stripe } from '@/app/pricing/utils/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  const { planId: priceId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE_URL}/success`,
      cancel_url: `${SITE_URL}/pricing`,
    });

    return NextResponse.json(session.url);
  } catch (err) {
    console.log(err);
  }
}
