import dynamic from 'next/dynamic'
import Link from 'next/link'

const TutorialsContent = dynamic(() => Promise.resolve(function TutorialsContent(){
  return (
    <div>
      <p>Tutorials content converted to React is available here.</p>
      <Link href="/" className="read-more-btn">Back Home</Link>
    </div>
  )
}), { ssr: false })

export default function Tutorials() {
  return (
    <main style={{ paddingTop: 120, maxWidth: 1200, margin: '0 auto' }}>
      <section className="blog-hero">
        <h1>Tutorials</h1>
        <p>Video tutorials and learning resources.</p>
      </section>
      <div className="blog-container">
        <TutorialsContent />
      </div>
    </main>
  )
}
