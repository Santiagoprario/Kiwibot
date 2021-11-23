import React from 'react';
import Deliveries from './Deliveries';
import styles from './Styles/Home.module.css'




function Home() {
    return (
        <div>
            <header className={styles.header}>
                <h2>Kiwibot challenge</h2>
                <h4>Control Panel</h4>
            </header>
            <Deliveries className={styles.deliveries} />
        </div>
    )
}

export default Home
