import './App.scss';
import { useAppRoutes } from '../pages/routing/useAppRoutes';

function App() {
  const appRoutes = useAppRoutes();
  return appRoutes;
}

export default App;
