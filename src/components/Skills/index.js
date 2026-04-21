import React from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";

/* ================= CONTAINER ================= */

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;

  /* 💻 Laptop / Desktop */
  padding: 80px 60px;

  /* 📱 Tablet */
  @media (max-width: 1024px) {
    padding: 80px 40px;
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

/* ================= TITLE ================= */

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 0 16px;
  }
`;

/* ================= GRID ================= */

const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* ✅ 2 cards per row */
  gap: 30px;

  /* 📱 Mobile */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* ✅ 1 card */
    gap: 16px;
    padding: 0 16px;
  }
`;

/* ================= ANIMATIONS ================= */

const floatAnim = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

/* ================= CARD ================= */

const Skill = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid #854ce6;
  border-radius: 16px;
  padding: 22px 28px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    animation: ${floatAnim} 2s ease-in-out infinite;
    box-shadow: 0 12px 30px rgba(23, 92, 230, 0.25);
  }
`;

const SkillTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const SkillItem = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary + "80"};
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 10px;
  }
`;

const SkillImage = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

/* ================= COMPONENT ================= */

const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working for the past 2
          years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill) => (
            <Skill key={skill.title}>
              <SkillTitle>{skill.title}</SkillTitle>

              <SkillList>
                {skill.skills.map((item, index) => (
                  <SkillItem key={index}>
                    <SkillImage src={item.image} />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
