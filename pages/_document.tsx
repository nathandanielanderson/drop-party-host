import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="/public/unity/DropParty/Build/DropParty.loader.js"></script>
      </body>
    </Html>
  );
}
