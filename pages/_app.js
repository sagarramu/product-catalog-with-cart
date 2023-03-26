import "@/styles/addtocart.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return <>
      <ToastContainer
        position="top-right"
        newestOnTop={false}
        theme="colored"
      />
      <Component {...pageProps} />
  </>
}
