import { Navigate, Route, Routes } from "react-router-dom"
import './RoutesWithNotFound.css';

export const RoutesWithNotFound = ({ children }) => { //Componente para rutas no encontradas
    return (
        <Routes>
            { children } {/**Se ubica al final de las otras rutas */}
            <Route path="*" element={<Navigate to={"/404"} />} />
            <Route path="/404" element={<main className="not-found">
                <div className="container-not-found">
                    <i className="fa-solid fa-record-vinyl"></i>
                    <h1 className="text">Página no encontrada</h1>
                </div>
            </main>} />
        </Routes>
    )
}