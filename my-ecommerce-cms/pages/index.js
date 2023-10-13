import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthContext } from './context/AuthContext';
import Layout from '../components/layout';
import { Link } from '../components/common/Links';

function Index() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/admin");
  }, [user]);

  return (
    <header className="flex h-full flex-col items-center justify-center sm:max-lg:min-h-[85vh]">
      <h1>Ecommerce CMS</h1>
      <p>built with</p>
      <div className="mb-2 flex max-w-[300px] items-center">
        <Link href={'https://nextjs.org/'} target={'_blank'}>
          Next.js
        </Link>
        <Link href={'https://xata.io/'} target={'_blank'}>
          Xata
        </Link>
        <Link href={'https://cloudinary.com/'} target={'_blank'}>
          Cloudinary
        </Link>
      </div>
      <div className="text-sm">
        deployed to{' '}
        <Link href={'https://netlify.com'} target={'_blank'}>
          Netlify
        </Link>
      </div>
    </header>
  );
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Index;
