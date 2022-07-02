import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Layout = ({ children, title = "Crypto Tracker" }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <Link href="/" passHref>
          <a>
            <Image src="/logo.png" width={250} height={200} />
          </a>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
