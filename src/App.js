import logo from './logo.svg';
import './App.css';
import { Cards } from './components/cards';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  return (

		<QueryClientProvider client={queryClient}>

    <Cards />
    <ReactQueryDevtools />
    </QueryClientProvider>

  );
}

export default App;
