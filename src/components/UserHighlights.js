import React from 'react';
import styled from 'styled-components';

const HighlightContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HighlightCategory = styled.div`
  text-align: center;
  width: 30%;
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const UserCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const UserName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #007aff;
`;

const UserFollowers = styled.div`
  font-size: 0.9em;
  color: #666;
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
          <UserCard key={user.id}>
            <UserName>{user.name}</UserName>
            <UserFollowers>{user.followers} seguidores</UserFollowers>
          </UserCard>
        ))}
      </HighlightCategory>
      <HighlightCategory>
        <Title>Últimos</Title>
        {recentStars.map((user) => (
          <UserCard key={user.id}>
            <UserName>{user.name}</UserName>
            <UserFollowers>{user.followers} seguidores</UserFollowers>
          </UserCard>
        ))}
      </HighlightCategory>
      <HighlightCategory>
        <Title>Populares</Title>
        {mostPopular.map((user) => (
          <UserCard key={user.id}>
            <UserName>{user.name}</UserName>
            <UserFollowers>{user.followers} seguidores</UserFollowers>
          </UserCard>
        ))}
      </HighlightCategory>
    </HighlightContainer>
  );
}

export default UserHighlights;
