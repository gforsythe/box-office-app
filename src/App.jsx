import {HashRouter, Routes, Route,} from 'react-router-dom';
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query';
import Home from './pages/Home';
import Starred from './pages/Starred';
import MainLayout from './components/MainLayout';
import Show from './pages/Show';
import { GlobalTheme } from './theme';

// Create a client
const queryClient = new QueryClient()






function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalTheme>
    <HashRouter>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/'element={<Home/>} />
        <Route path='starred'element={<Starred/>} />
      </Route>

      <Route path='/show/:showId' element={<Show/>}/>


      <Route path='*'element={<div>Sorry Bro! This Aint it!</div>} />
 
    </Routes>
    </HashRouter>
    </GlobalTheme>
    </QueryClientProvider>
  );
}

export default App;
