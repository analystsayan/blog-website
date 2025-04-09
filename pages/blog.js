import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('posts'));

    const posts = files.map((filename) => {
        const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}

export default function BlogPage({ posts }) {
    return (
        <div className="blog-container">
            <h1 className="blog-heading">📚 My Blogs</h1>
            <div className="blog-grid">
                {posts.map(({ slug, frontmatter }) => (
                    <div key={slug} className="blog-card">
                        <h2 className="blog-title">{frontmatter.title}</h2>
                        <p className="blog-date">{frontmatter.date}</p>
                        <div className="writer">
                            <img
                                src="/images/writer/sayan.png"
                                alt="Writer"
                                className="writer-image">
                            </img>
                            <p>By Analyst Sayan</p>
                        </div>
                        <p className="blog-snippet">
                            {frontmatter.description || 'Click to read more...'}
                        </p>
                        <Link href={`/${slug}`} className="blog-readmore">
                            Read Post →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
