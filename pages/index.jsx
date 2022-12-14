import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [botInfo, setBotInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtnDisabled(true);

    try {
      const res = await axios.post('/api/run', { token });
      console.log(res.status);
      console.log(res.data);

      if (res.status === 200) {
        setSuccess(true);
        toast.success('Logged in successfully.');
        setMessage(
          <p>
            Your bot is currently online. Invite your bot from{' '}
            <a
              href={res.data.inviteURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
        );

        const { id, username, tag } = res.data;
        setBotInfo({ id, username, tag });
      } else {
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data?.message || err.message}`);
      setSuccess(false);
    }

    setTimeout(() => {
      setBtnDisabled(false);
    }, 2500);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <Head>
        <title>Claim Discord Developer Badge - Under Ctrl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/activedev.png" />
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.imgs}>
          <img src="/gigachad.png" alt="Active Developer Badge" />
          <img src="/activedev.png" alt="Active Developer Badge" />
        </div>

        <h1>Claim Discord Developer Badge</h1>
        <p>Get your Discord developer badge without any coding!</p>

        <main className={styles.main}>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your bot's token"
                value={token}
                required
                minLength={60}
                onChange={(e) => {
                  setToken(e.target.value);
                }}
              />
              <button disabled={btnDisabled} type="submit">
                Submit
              </button>
            </form>
          ) : (
            <div className={styles.botInfo}>
              <h3>Bot running!</h3>
              {message}
              <p>
                Your bot will automatically go offline if it's inactive for 2
                minutes!
              </p>

              <h3>Bot information:</h3>

              <ul>
                <li>
                  ID: <span className={styles.code}>{botInfo.id}</span>
                </li>
                <li>
                  Username:{' '}
                  <span className={styles.code}>{botInfo.username}</span>
                </li>
                <li>
                  Tag: <span className={styles.code}>{botInfo.tag}</span>
                </li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
