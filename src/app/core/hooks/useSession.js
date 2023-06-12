import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

const supabaseClient = createClientComponentClient();

const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (!error) setSession(data.session);
    };
    getSession();
  }, []);

  return [session];
};

export default useSession;
