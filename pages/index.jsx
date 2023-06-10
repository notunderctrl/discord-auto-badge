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

      if (res.status === 200) {
        setSuccess(true);
        toast.success('Logged in successfully.');
        setMessage(
          <p>
            Your bot is now online! Invite your bot using{' '}
            <a href={res.data.inviteURL} target="_blank" rel="noopener noreferrer">
              here
            </a>
          </p>
        );

        const { id, username } = res.data;
        setBotInfo({ id, username });
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
        <meta
          name="description"
          content="Get your Discord developer badge without any coding! An open source tool that will register your slash commands for you and allow you to claim your Discord developer badge."
        />
        <link rel="icon" href="/activedev.png" />
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.imgs}>
          <img src="/gigachad.png" alt="Active Developer Badge" />
          <img src="/activedev.png" alt="Active Developer Badge" />
        </div>

        <h1>Claim Discord Developer Badge</h1>

        <div className={`${styles.textField} ${styles.center}`}>
          <p>
            Get your Discord developer badge without any coding! This is an{' '}
            <a
              href="https://github.com/notunderctrl/discord-auto-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source tool
            </a>{' '}
            that will allow you to automatically register slash commands and run it one time on your
            bot.
          </p>
        </div>

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
                Your bot will automatically go offline if it&apos;s inactive for over 2 minutes.
                This is done to limit the number of bot logins at one time.
              </p>

              <h3>Bot information:</h3>

              <ul>
                <li>
                  ID: <span className={styles.code}>{botInfo.id}</span>
                </li>
                <li>
                  Username: <span className={styles.code}>{botInfo.username}</span>
                </li>
              </ul>
            </div>
          )}
        </main>

        <br />
        <div className={styles.textField}>
          <h2>How to use this tool</h2>
          <br />
          <ol className={styles.guideList}>
            <li>
              Create an application in your{' '}
              <a
                href="https://discord.com/developers/applications"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord Developer Portal
              </a>{' '}
              by clicking on the &quot;New Application&quot; button on the top right.
            </li>
            <img src="https://i.imgur.com/atm10Q8.png" alt="" />

            <li>Give your application a name, accept the TOS and create it.</li>
            <img src="https://i.imgur.com/rHpFh24.png" alt="" />

            <li>Head over to the bot section on the left.</li>
            <img src="https://i.imgur.com/sng9uY6.png" alt="" />

            <li>Click &quot;Add Bot&quot; and click &quot;Yes do it&quot;.</li>
            <img src="https://i.imgur.com/gvU5FE7.png" alt="" />
            <img src="https://i.imgur.com/9YA9vDx.png" alt="" />

            <li>Now reset your bot token and copy it.</li>
            <img src="https://i.imgur.com/Ra8Xfi2.png" alt="" />

            <li>Paste your token above and click submit.</li>
            <img src="https://i.imgur.com/6HUkZvh.png" alt="" />

            <li>
              Once it&apos;s logged in, invite your bot using the provided link and run the{' '}
              <span className={styles.code}>/claim</span> slash command.
            </li>
          </ol>

          <br />
          <br />

          <h2>Contact Information</h2>
          <div className={`${styles.contact} ${styles.guideList}`}>
            <ul>
              <li>
                Email:{' '}
                <a href="mailto:avraj@underctrl.io" target="_blank" rel="noopener noreferrer">
                  avraj@underctrl.io
                </a>
              </li>
              <li>Discord: Under Ctrl#0001 (preferred)</li>
            </ul>
          </div>

          <br />
          <br />
          <div className={styles.center}>Thank you for using this tool ❤️</div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
