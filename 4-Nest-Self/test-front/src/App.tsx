import { useState } from 'react'
import './App.css'
import ShowDataComponent from './components/ShowData';
import AuthComponent from './components/Auth';

function App() {

  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className='text-3xl font-bold text-red-500'>Hello-World</div>
      <button onClick={()=>setToggle(!toggle)} className='border-[1px] p-2'>Change</button>
      {toggle ?<ShowDataComponent/> : <AuthComponent/>}
    </>
  )
}

export default App
