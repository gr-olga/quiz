import styles from './popUpScore.module.scss';

type PopUpScoreProps = {
  score: number;
  onClose: () => void;
}

export const PopUpScore = ({score, onClose}: PopUpScoreProps) => {

  return (
      <div>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.popupContainer}>
          <h1 className={styles.scoreTitle}>Your score:</h1>
          <div className={styles.scoreValue}>{score}</div>
          <button className={styles.closeButton} onClick={onClose}>Close</button>
        </div>
      </div>
  );
};