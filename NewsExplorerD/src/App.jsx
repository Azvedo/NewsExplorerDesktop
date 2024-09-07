import { Header } from './components/header/Header'
import NewsList from './services/get/NewsList'; // Import the NewsList component

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
