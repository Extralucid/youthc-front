import { useState } from 'react';

const MapFilters = ({ categories, onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    radius: 10, // km
    activeOnly: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="map-filters">
      <h3>Filtrer Les Agences</h3>
      
      <div className="filter-group">
        <label>Type d'Agences</label>
        <select 
          name="category" 
          value={filters.category}
          onChange={handleChange}
        >
          <option value="all">Tout Type</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Rayon: {filters.radius} km</label>
        <input
          type="range"
          name="radius"
          min="1"
          max="50"
          value={filters.radius}
          onChange={handleChange}
        />
      </div>
      
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="activeOnly"
            checked={filters.activeOnly}
            onChange={handleChange}
          />
          Active Only
        </label>
      </div>
    </div>
  );
};

export default MapFilters;