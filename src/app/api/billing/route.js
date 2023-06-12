import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { stripe } from '@/app/pricing/utils/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/app/core/utils';

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (!user) {
    return NextResponse.json({ status: 401 });
  }

  const { data: profile } = await supabase
    .from('profile')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: SITE_URL,
  });

  return NextResponse.json({ url: session.url });
}
