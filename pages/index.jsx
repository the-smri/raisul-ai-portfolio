import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../components/Hero.jsx'))
const Stats = dynamic(() => import('../components/Stats.jsx'))

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
    </>
  )
}
