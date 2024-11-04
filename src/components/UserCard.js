// UserCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(135deg, #f0f4f8, #d9e6f2);
  border: 1px solid #e0e4e8;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
`;

const UserInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    margin-left: 0;
    align-items: center;
    margin-top: 10px;
  }
`;

const UserImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e0e4e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #007aff;

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`;

const UserName = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: #007aff;
`;

const UserFollowers = styled.div`
  font-size: 0.9em;
  color: #555;
`;

function UserCard({ name, followers }) {
  return (
    <Card>
      <UserImage>{name.charAt(0)}</UserImage>
      <UserInfo>
        <UserName>{name}</UserName>
        <UserFollowers>{followers} seguidores</UserFollowers>
      </UserInfo>
    </Card>
  );
}

export default UserCard;
