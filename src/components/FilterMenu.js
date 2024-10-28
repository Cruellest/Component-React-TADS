import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff; 
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007aff;
    outline: none;
  }
`;

function FilterMenu({ onGroupByChange, onViewTypeChange, onFilterPeriodChange }) {
  return (
    <FilterContainer>
      <Label>
        Agrupar por:
        <Select onChange={(e) => onGroupByChange(e.target.value)}>
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
          <option value="year">Ano</option>
        </Select>
      </Label>
      <Label>
        Tipo de visualização:
        <Select onChange={(e) => onViewTypeChange(e.target.value)}>
          <option value="absolute">Absoluto</option>
          <option value="cumulative">Cumulativo</option>
        </Select>
      </Label>
      <Label>
        Período:
        <Select onChange={(e) => onFilterPeriodChange(e.target.value)}>
          <option value="all">Todo o período</option>
          <option value="30">Últimos 30 dias</option>
          <option value="180">Últimos 6 meses</option>
          <option value="365">Último ano</option>
        </Select>
      </Label>
    </FilterContainer>
  );
}

export default FilterMenu;
