import React from 'react';
const SearchBox = React.lazy(() => import('./SearchBar/SearchBar'));
const FeaturedDeals = React.lazy(() => import('./FeaturedDeals'));
const RecentVisit = React.lazy(() => import('./RecentVisit'));
const TrendingDestinations = React.lazy(() => import('./Trending'));
import { useScrollTop } from '../../hooks';
import { useDocumentTitle } from '../../hooks';
const UserHome = () => {
  useScrollTop();
  useDocumentTitle('Traveller');
  return (
    <div>
      <SearchBox />

      <FeaturedDeals />

      <RecentVisit />

      <TrendingDestinations />
    </div>
  );
};

export default UserHome;
