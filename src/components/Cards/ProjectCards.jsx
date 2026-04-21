import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    transition: all 0.8s ease-in-out;
`;

/* =====================================
      ELECTRIC ANIMATED BORDER CARD
   ===================================== */
const Card = styled.div`
    position: relative;
    width: 100%;
    max-width: 330px;
    height: auto;
    min-height: 490px;
    background-color: ${({ theme }) => theme.card};
    border-radius: 16px;
    padding: 26px 20px;
    overflow: visible;       /* IMPORTANT FIX */
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: 0.4s ease-in-out;

    /* ELECTRIC BORDER FIX */
    &::before {
        content: "";
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;

        border-radius: 18px;
        padding: 4px;
        z-index: -1;

        background: linear-gradient(
            90deg,
            #942fc7ff,
            #321B44,
            #8734c1ff,
            #ff7b00,
            #ffaf60ff
        );
        background-size: 300% 100%;
        filter: drop-shadow(0 0 20px #a325e7ff);

        /* Transparent border trick */
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;

        animation: glow 2s linear infinite;
    }

    @keyframes glow {
        0% { background-position: 0% 0%; }
        100% { background-position: 300% 0%; }
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 0 40px rgba(131, 30, 255, 0.4);
    }

    @media (max-width: 768px) {
        max-width: 100%;
        width: auto;
        margin: 0 20px;
        min-height: auto;
    }
`;

/* IMAGE */
const Image = styled.img`
    width: 100%;
    height: 180px;
    border-radius: 10px;
    @media (max-width: 768px) {
        height: 160px;
    }
    @media (max-width: 500px) {
        height: 140px;
    }
`;

/* TAGS */
const Tags = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
    align-items: center;
`;

const Tag = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
    @media (max-width: 768px) {
        font-size: 10px;
    }
`;

/* DETAILS */
const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
        font-size: 16px;
    }
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media (max-width: 768px) {
        font-size: 10px;
    }
    @media (max-width: 500px) {
        font-size: 8px;
    }
`;

const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
        font-size: 12px;
    }
    @media (max-width: 500px) {
        font-size: 10px;
        margin-top: 4px;
    }
`;

/* MEMBERS */
const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`;

const Avatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
    }
    @media (max-width: 500px) {
        width: 26px;
        height: 26px;
    }
`;

/* COMPONENT */
const ProjectCards = ({ project, setOpenModal }) => {
    return (
        <Card onClick={() => setOpenModal({ state: true, project: project })}>
            <Image src={project.image} />

            <Tags>
                {project.tags?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </Tags>

            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
            </Details>

            <Members>
                {project.member?.map((member, index) => (
                    <Avatar key={index} src={member.img} />
                ))}
            </Members>
        </Card>
    );
};

export default ProjectCards;
