// UserHighlights.js
import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';

const HighlightContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

const HighlightCategory = styled.div`
  text-align: center;
  width: 30%;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`;

function UserHighlights({ users }) {
  const firstStars = [...users].sort((a, b) => new Date(a.starred_at) - new Date(b.starred_at)).slice(0, 5);
  const recentStars = [...users].sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at)).slice(0, 5);
  const mostPopular = [...users].sort((a, b) => b.followers - a.followers).slice(0, 5);

  return (
    <HighlightContainer>
      <HighlightCategory>
        <Title>Primeiros</Title>
        {firstStars.map((user) => (
          <UserCard key={user.id} name={user.name} followers={user.followers} />
        ))}
      </HighlightCategory>
      <HighlightCategory>
        <Title>Últimos</Title>
        {recentStars.map((user) => (
          <UserCard key={user.id} name={user.name} followers={user.followers} />
        ))}
      </HighlightCategory>
      <HighlightCategory>
        <Title>Populares</Title>
        {mostPopular.map((user) => (
          <UserCard key={user.id} name={user.name} followers={user.followers} />
        ))}
      </HighlightCategory>
    </HighlightContainer>
  );
}

export default UserHighlights;
