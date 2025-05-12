import { HashRouter, Navigate, Route } from 'react-router-dom'
import { AppRoutes } from './models';
import { Home, Details, DetailsAlbum } from './public';
import { RoutesWithNotFound } from './components';

export const AppRouter = () => {
  return (
    <HashRouter>
      <RoutesWithNotFound>
        <Route path='/' element={<Navigate to={AppRoutes.home} />} />
        <Route path={AppRoutes.home} element={<Home />} />
        <Route path={AppRoutes.details} element={<Details />} />
        <Route path={AppRoutes.detailsAlbum} element={<DetailsAlbum />} />
      </RoutesWithNotFound>
    </HashRouter>
  )
}