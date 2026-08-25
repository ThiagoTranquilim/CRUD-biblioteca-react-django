import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Livros from './pages/Livros/Livro'
import Autores from './pages/Autores/Autor'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/livro" element={<Livros />} />
      <Route path="/autor" element={<Autores />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
