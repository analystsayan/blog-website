import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

// Get all paths
export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

// Props for each page
export async function getStaticProps({ params }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', `${params.slug}.md`),
        'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Load all posts for suggestions
    const files = fs.readdirSync(path.join('posts'));

    const allPosts = files
        .filter((file) => file !== `${params.slug}.md`) // exclude current post
        .map((filename) => {
            const fileContent = fs.readFileSync(path.join('posts', filename), 'utf-8');
            const { data } = matter(fileContent);
            return {
                slug: filename.replace('.md', ''),
                title: data.title || 'Untitled',
            };
        })
        .slice(0, 5); // pick 5 posts (change to random if needed)

    return {
        props: {
            frontmatter,
            contentHtml,
            slug: params.slug,
            suggestions: allPosts,
        },
    };
}

// Page Component
export default function PostPage({ frontmatter, contentHtml, suggestions }) {
    return (
        <main className="post-container">
            <article className="post">
                <h1 className="post-title">{frontmatter.title}</h1>
                <p className="post-date">{frontmatter.date}</p>
                {frontmatter.category && (
                    <p className="post-category">
                        Category: <strong>{frontmatter.category}</strong>
                    </p>
                )}
                <section
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
                <p>Article by — <a href="https://linkedin.com/in/analystsayan" target="_blank">Analyst Sayan</a></p>
            </article>

            {/* Suggested posts */}
            <section className="suggested-posts">
                <h3>📌 You Might Also Like</h3>
                <ul>
                    {suggestions.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/${post.slug}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className="more-blogs-wrapper">
                    <Link href="/blog" className="more-blogs-btn">More Blogs →</Link>
                </div>
            </section>
        </main>
    );
}
