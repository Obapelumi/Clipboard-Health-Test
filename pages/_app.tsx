
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";

const Noop = ({ children }) => children;

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || Noop;

  return (
    <Layout meta={Component.meta || {}}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
MyApp
