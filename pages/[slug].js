import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        props: {
            frontmatter,
            slug,
            contentHtml,
        },
    };
}

// pages/[slug].js
export default function PostPage({ frontmatter, contentHtml }) {
    return (
        <main className="post-container">
            <article className="post">
                <h1 className="post-title">{frontmatter.title}</h1>
                <p className="post-date">{frontmatter.date}</p>
                {frontmatter.category && (
                    <p className="post-category">Category: {frontmatter.category}</p>
                )}
                <section
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </article>
        </main>
    );
}
