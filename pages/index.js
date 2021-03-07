import Head from 'next/head'
import Monitor from '../components/Monitor'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Drone Monitor</title>        
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Drone Monitor
        </h1>
        <Monitor />
      </main>
      <footer className={styles.footer}>
        <p>Grupo 2</p>
      </footer>
    </div>
  )
}
