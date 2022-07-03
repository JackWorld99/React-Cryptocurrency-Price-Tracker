import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_row}>
        <div className={styles.header}>
          <h1 className={styles.header_h1}>Coin</h1>
        </div>
        <div className={styles.header_data}>
          <p className={styles.header_price}>Price</p>
          <p>24h Volume</p>
          <p className={styles.header_percent}>24h</p>
          <p className={styles.header_marketcap}>Market Cap</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
