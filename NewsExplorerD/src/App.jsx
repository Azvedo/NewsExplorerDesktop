import { Header } from './components/Header'
import NewsList from './services/NewsList'; // Import the NewsList component

function App() {
  return (
    <>
      <Header />
      <main>
        <NewsList />
      </main>
    </>
  )
}

export default App
