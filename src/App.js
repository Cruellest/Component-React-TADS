import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import UserHighlights from './components/UserHighlights';
import FilterMenu from './components/FilterMenu';
import starData from './data/thefuck-sample-full.json';
import ChartStars from './components/ChartStars';

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-align: center;
  padding: 40px;
  background-color: #f5f5f7;
  color: #333;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: #1c1c1e;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1px; 
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 10px 0;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Section = styled.section`
  margin-top: 20px;
  padding: 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

function App() {
  const [groupBy, setGroupBy] = useState('day');
  const [viewType, setViewType] = useState('absolute');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [users, setUsers] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setAllData(starData);
    setUsers(starData.map(entry => ({
      ...entry.user,
      starred_at: entry.starred_at,
      followers: entry.user.followers,
    })));
  }, []);

  const filteredData = useMemo(() => {
    const now = new Date();
    const periodLimit = filterPeriod === '30' ? 30 : filterPeriod === '180' ? 180 : filterPeriod === '365' ? 365 : null;

    let cumulativeStars = 0;
    const dateCounts = {};

    allData.forEach(entry => {
      const date = new Date(entry.starred_at);
      if (periodLimit && (now - date) / (1000 * 60 * 60 * 24) > periodLimit) {
        return;
      }

      const dateStr = date.toISOString().split('T')[0];
      if (!dateCounts[dateStr]) {
        dateCounts[dateStr] = 0;
      }
      dateCounts[dateStr]++;
    });

    return Object.keys(dateCounts)
      .sort()
      .map(dateStr => {
        cumulativeStars += dateCounts[dateStr];
        return {
          date: new Date(dateStr),
          stars: viewType === 'cumulative' ? cumulativeStars : dateCounts[dateStr],
        };
      });
  }, [allData, filterPeriod, viewType]);

  return (
    <Container>
      <Title>Estatísticas de Estrelas do Repositório</Title>
      <Section>
        <h2>Filtros de Visualização</h2>
        <FilterWrapper>
          <FilterMenu
            onGroupByChange={setGroupBy}
            onViewTypeChange={setViewType}
            onFilterPeriodChange={setFilterPeriod}
          />
        </FilterWrapper>
      </Section>
      <Section>
        <h2>Gráfico de Crescimento de Estrelas</h2>
        <ChartStars data={filteredData} groupBy={groupBy} viewType={viewType} />
      </Section>
      <Section>
        <h2>Usuários em Destaque</h2>
        <UserHighlights users={users} />
      </Section>
    </Container>
  );
}

export default App;
