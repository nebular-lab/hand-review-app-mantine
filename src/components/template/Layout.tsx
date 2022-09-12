import { NextPage } from "next";
import Head from "next/head";
import React, { FC, ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

const Layout: FC<Props> = ({ title = "hand-review-app", children }) => {
  return (
    <div className="flex min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex w-screen flex-1 flex-col items-center ">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
