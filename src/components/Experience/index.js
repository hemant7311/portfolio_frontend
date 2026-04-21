import React from "react";
import styled from "styled-components";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ExperienceCard from "../Cards/ExperienceCard";
import { experiences } from "../../data/constants";
import { useMediaQuery } from "@mui/material";

/* ================= LAYOUT ================= */

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 40px 0px;
`;

/* ================= TITLE ================= */

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  max-width: 650px;
  margin: 0 auto 40px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 0 16px;
  }
`;

/* ================= COMPONENT ================= */

const Experience = () => {
  const isMobile = useMediaQuery("(max-width:500px)");
  const isTablet = useMediaQuery("(min-width:501px) and (max-width:991px)");
  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <Container id="experience">
      <Wrapper>
        <Title>Journey</Title>
        <Desc>
          My journey as a software engineer, growing through different roles,
          companies and impactful projects.
        </Desc>

        <Timeline
          position={isMobile ? "right" : "alternate"}
          sx={{
            width: "100%",

            /* 📱 Mobile → 20px margin */
            ...(isMobile && {
              paddingLeft: "20px",
              paddingRight: "20px",
            }),

            /* 📱 Tablet → 40px */
            ...(isTablet && {
              paddingLeft: "40px",
              paddingRight: "40px",
            }),

            /* 💻 Laptop / Desktop → 60px */
            ...(isDesktop && {
              paddingLeft: "60px",
              paddingRight: "60px",
            }),
          }}
        >
          {experiences.map((experience, index) => (
            <TimelineItem
              key={index}
              sx={{
                ...(isMobile && {
                  width: "100%",
                  alignItems: "flex-start",

                  /* ❌ Remove MUI center gap on mobile */
                  "&::before": {
                    flex: 0,
                    padding: 0,
                  },
                }),
              }}
            >
              <TimelineSeparator
                sx={{
                  ...(isMobile && {
                    marginLeft: "8px",
                    marginRight: "12px",
                    alignItems: "flex-start",
                  }),
                }}
              >
                <TimelineDot variant="outlined" color="secondary" />
                {index !== experiences.length - 1 && (
                  <TimelineConnector sx={{ background: "#854CE6" }} />
                )}
              </TimelineSeparator>

              <TimelineContent
                sx={{
                  py: "12px",
                  px: 0,

                  /* 📱 Mobile */
                  ...(isMobile && {
                    width: "100%",
                    textAlign: "left",
                  }),

                  /* 💻 Tablet / Desktop */
                  ...(!isMobile && {
                    textAlign: index % 2 === 0 ? "left" : "right",
                    ml: index % 2 === 0 ? "20px" : "0px",
                    mr: index % 2 !== 0 ? "20px" : "0px",
                  }),
                }}
              >
                <ExperienceCard experience={experience} />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Wrapper>
    </Container>
  );
};

export default Experience;
