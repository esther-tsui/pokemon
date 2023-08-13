import logo from './logo.svg';
import './App.css';
import { Cards } from './components/cards';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  return (

		<QueryClientProvider client={queryClient}>
    <div style={{ minHeight: '100vh'}}>
      
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems:"center", flexBasis: 0}}>
    <Cards />
    </div>
    <ReactQueryDevtools />
    </div>

    </QueryClientProvider>

  );
}

export default App;
