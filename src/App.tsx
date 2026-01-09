import { Routes, Route } from 'react-router-dom'
import { 
  Dashboard, 
  RequirementList, 
  RequirementDetail, 
  CreateRequirement, 
  Analytics,
  Customers,
  Settings,
  MatrixView
} from './pages'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/requirements" element={<RequirementList />} />
      <Route path="/requirements/matrix" element={<MatrixView />} />
      <Route path="/requirements/:id" element={<RequirementDetail />} />
      <Route path="/create" element={<CreateRequirement />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}





