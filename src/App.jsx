import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import Home from './pages/Home';
import Starred from './pages/Starred';
import MainLayout from './components/MainLayout';
import Show from './pages/Show';

// Create a client
const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/'element={<Home/>} />
        <Route path='starred'element={<Starred/>} />
      </Route>

      <Route path='/show/:showId' element={<Show/>}/>


      <Route path='*'element={<div>Sorry Bro! This Aint it!</div>} />
 
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
