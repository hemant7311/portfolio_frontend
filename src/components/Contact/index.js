import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Snackbar } from "@mui/material";

/* ================= CONTAINER ================= */

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 📱 MOBILE */
  @media (max-width: 712px) {
    flex-direction: column;
    gap: 40px;
  }

  /* ✅ 713px–960px */
  @media (min-width: 713px) and (max-width: 960px) {
    flex-direction: row;
    gap: 30px;
  }
`;

/* ================= LAMP ================= */

const LampBox = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;

  @media (max-width: 712px) {
    width: 100%;
  }
`;

const LampWrapper = styled.div`
  cursor: pointer;
  text-align: center;
`;

const PullText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ================= FORM ================= */

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(80px); }
  to { opacity: 1; transform: translateX(0); }
`;

const FormBox = styled.div`
  width: 45%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "all" : "none")};
  animation: ${({ show }) => (show ? slideIn : "none")} 0.6s ease forwards;
  margin-right: 70px;

  @media (max-width: 960px) {
    width: 100%;
    margin-right: 0;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgb(133, 76, 230);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  background: ${({ theme }) => theme.card};
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* 📱 PHONE FONT SIZE */
  @media (max-width: 712px) {
    font-size: 12px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_primary};
  font-size: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_primary};
  font-size: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(225deg, #8a2be2, #ff00ff);
`;

/* ================= COMPONENT ================= */

const Contact = () => {
  const formRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const payload = {
      email: formData.get("from_email"),
      name: formData.get("from_name"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    if (!payload.email || !payload.message) {
      setSnack({ open: true, msg: "Email and message required" });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSnack({ open: true, msg: "Email sent successfully!" });
        formRef.current.reset();
      } else {
        setSnack({ open: true, msg: "Failed to send email" });
      }
    } catch {
      setSnack({ open: true, msg: "Server not reachable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff", marginBottom: 20 }}>
        Contact Us
      </h1>

      <Container>
        <Wrapper>
          {/* LAMP */}
          <LampBox>
            <LampWrapper onClick={() => setShowForm(true)}>
              <img
                src="/table-lamp-interior-design-white-background.png"
                alt="Lamp"
                style={{ width: 230 }}
              />
              <PullText>Pull the lamp to open contact form</PullText>
            </LampWrapper>
          </LampBox>

          {/* FORM */}
          <FormBox show={showForm}>
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <ContactTitle>Email Me 🚀</ContactTitle>

              <Input name="from_email" placeholder="Your Email" required />
              <Input name="from_name" placeholder="Your Name" />
              <Input name="subject" placeholder="Subject" />
              <Textarea
                name="message"
                rows="4"
                placeholder="Message"
                required
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </ContactForm>
          </FormBox>
        </Wrapper>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.msg}
      />
    </>
  );
};

export default Contact;
