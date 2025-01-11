import styles from './MovieCard.module.css';

function MovieCard ({imageUrl, title, summary}) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={`${imageUrl}`} alt={`movie: ${title}`} className={styles.cardImage} />
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardSummary}>{summary}</p>
            </div>
        </div>
    );
}

export default MovieCard;