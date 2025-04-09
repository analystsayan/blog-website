import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (    
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1>Welcome to My Blog 🚀</h1>
                <p className={styles.subtitle}>Sharing knowledge, insights, and stories on web development, technology, and more.</p>
                <Link href="/blog" className={styles.heroBtn}>Read My Blogs</Link>
            </section>

            <section className={styles.section}>
                <h2>👨‍💻 About This Blog</h2>
                <p>This blog is a space where I document what I learn, build, and discover in the world of tech — especially web development, tools, and creative side projects.</p>
            </section>

            <section className={styles.section}>
                <h2>🔥 Featured Posts</h2>
                <ul className={styles.list}>
                    <li><Link href="/build-a-blogging-website">🔹 Build a blogging website</Link></li>
                    <li><Link href="/get-passport-fast">🔹 Get Passport Fast</Link></li>
                    <li><Link href="/learn-system-design">🔹 Learn System Design</Link></li>
                </ul>
                <div className={styles.centerBtn}>
                    <Link href="/blog" className={styles.seeAllBtn}>See All Blogs →</Link>
                </div>
            </section>
        </main>
    );
}
