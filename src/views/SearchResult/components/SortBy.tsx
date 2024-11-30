import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

interface SortByComponentProps {
  onSortChange: (value: string) => void;
}

const SortByComponent: React.FC<SortByComponentProps> = ({ onSortChange }) => (
  <FormControl variant="outlined" margin="normal">
    <InputLabel>Sort By</InputLabel>
    <Select onChange={e => onSortChange(e.target.value)} label="Sort By" defaultValue="Relevance">
      <MenuItem value="Relevance">Relevance</MenuItem>
      <MenuItem value="Price Low to High">Price 🔼</MenuItem>
      <MenuItem value="Price High to Low">Price 🔽</MenuItem>
      <MenuItem value="Rating">Rating ⭐</MenuItem>
      <MenuItem value="Favorites">Favorites 💖</MenuItem>
    </Select>
  </FormControl>
);

export default SortByComponent;
