import dynamic from 'next/dynamic'
import Link from 'next/link'

const BlogContent = dynamic(() => Promise.resolve(function BlogContent(){
  return (
    <article className="featured-post card">
      <div className="featured-content">
        <div className="featured-tag">Featured</div>
        <h2 className="featured-title">Welcome to my blog</h2>
        <p className="featured-excerpt">This blog contains my latest articles and tutorials about AI and software engineering.</p>
        <Link href="/" className="read-more-btn">Back Home</Link>
      </div>
    </article>
  )
}), { ssr: false })

export default function Blog() {
  return (
    <main style={{ paddingTop: 120, maxWidth: 1200, margin: '0 auto' }}>
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>Insights, tutorials and project updates.</p>
      </section>
      <div className="blog-container">
        <BlogContent />
      </div>
    </main>
  )
}
