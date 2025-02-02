import {useState} from 'react'
import './style/App.css'
import "./style/reset.css"
import Header from "./components/Header"
import EmptyPage from "./components/Empty"
import Filter from "./components/Filter"
import NewForm from './components/NewForm'
import Main from './components/Main'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [newData, setNewData] = useState([]);
  const [showDetails,setShowDetails] = useState(false);
  const [status, setStatus] = useState("pending"); 

  return (
    <>
      <Header />
      <Filter openForm={() => setShowForm(true)} showForm={showForm} newData={newData} />
      <div className="container">
        {showForm ? (
          <NewForm
            openForm={() => setShowForm(false)}
            showForm={showForm}
            setShowForm = {setShowForm}
            newData={newData}
            setNewData={setNewData} 
            status = {status}
            setStatus={setStatus}
          />
        ) : (
          <>
            {newData.length === 0 ? (
              <EmptyPage />
            ) : (
              <Main showDetails = {showDetails} setShowDetails = {setShowDetails} newData={newData}  setNewData={setNewData} status = {status}
              setStatus={setStatus}  />
            )}
          </>
        )}
        
      </div>
    </>
  );
}
export default App
