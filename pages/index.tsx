import { Suspense } from 'react';
import type { NextPage } from 'next'
import Container from '../components/Container';

const Home: NextPage = () => {
  return (
    <Suspense fallback={null}>
      <Container>
        <div>
          About me
        </div>
        <div>
          Recent posts
        </div>
      </Container>
    </Suspense>
  )
}

export default Home
