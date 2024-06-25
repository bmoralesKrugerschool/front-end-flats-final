
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} /> //Página de inicio
        <Route path="/login" element={<Login />} /> //Inicio de sesión
        <Route path="/register" element={<Register />} /> //Registro de usuario
        <Route path="/profile" element={<h1>Profile</h1>} /> //Perfil del usuario
        <Route path="/about" element={<h1>About</h1>} /> //Acerca de
        <Route path="/flats" element={<h1>Flats</h1>} /> //Listado de pisos
        <Route path="/flats/:id" element={<h1>HOLA</h1>} />  //Detalle de un piso
        <Route path="/flats/:id/edit" element={<h1>HOLA</h1>} />   //Edición de un piso
        <Route path="/flats/new" element={<h1>HOLA</h1>} />     //Creación de un piso
        <Route path="*" element={<h1>NotFound</h1>} />   //Página no encontrada
      </Routes>
    </BrowserRouter>
  )
}

export default App
