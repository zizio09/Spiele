import { Navigate, Route, Routes } from 'react-router-dom'
import { CelebrationPreviewPage } from './components/CelebrationPreviewPage'
import { HomePage } from './components/HomePage'
import { Layout } from './components/Layout'
import { PaarsuchePage } from './games/paarsuche/PaarsuchePage'
import { SudokuPage } from './games/sudoku/SudokuPage'
import { ViererkettePage } from './games/viererkette/ViererkettePage'
import { WordlePage } from './games/wordle/WordlePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="wordle" element={<WordlePage />} />
        <Route path="viererkette" element={<ViererkettePage />} />
        <Route path="sudoku" element={<SudokuPage />} />
        <Route path="paarsuche" element={<PaarsuchePage />} />
        <Route path="preview/celebration" element={<CelebrationPreviewPage />} />
        <Route path="dev/celebration" element={<Navigate to="/preview/celebration" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
