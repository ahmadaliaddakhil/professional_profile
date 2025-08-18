"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./style.module.scss";
import Magnetic from "../../common/Magnetic";
import Rounded from "../../common/RoundedButton";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Contact() {
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const indonesiaTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(`${indonesiaTime} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        alert("Message sent successfully");
        setFormData({
          name: "",
          email: "",
          organization: "",
          services: "",
          message: "",
        });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.contact} ref={container}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          Let&apos;s start a <br /> project <br /> together
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <span className={styles.number}>01</span>
            <div className={styles.inputField}>
              <label>What&apos;s your name?</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ahmad Ali *"
                required
              />
              {errors.name && (
                <small className={styles.error}>{errors.name}</small>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.number}>02</span>
            <div className={styles.inputField}>
              <label>What&apos;s your email?</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ahmadaliaddakhil@gmail.com *"
                required
              />
              {errors.email && (
                <small className={styles.error}>{errors.email}</small>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.number}>03</span>
            <div className={styles.inputField}>
              <label>What&apos;s the name of your organization?</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Ahmad & Ali ®"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.number}>04</span>
            <div className={styles.inputField}>
              <label>What services are you looking for?</label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="Web Design, Web Development ..."
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.number}>05</span>
            <div className={styles.inputField}>
              <label>Your message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello Ali, can you help me with ..."
              />
            </div>
          </div>

          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
              <button
                className={styles.sendButton}
                type="submit"
                disabled={loading}
              >
                <p>{loading ? "Sending..." : "Send it!"}</p>
              </button>
            </Rounded>
          </motion.div>
        </form>
      </div>

      <div className={styles.right}>
        <Image
          width={400}
          height={300}
          src="/images/background-punk.jpg"
          alt="Profile"
          className={styles.avatar}
        />

        <div className={styles.details}>
          <div>
            <h4>CONTACT DETAILS</h4>
            <Magnetic>
              <p>
                <a
                  href="mailto:ahmadaliaddakhil@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.anchorLink}
                >
                  ahmadaliaddakhil@gmail.com
                </a>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <a
                  href="https://wa.me/6288741076997?text=Hello%20Ahmad%20Ali,%20I%20need%20your%20help..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 887 4107 6997
                </a>
              </p>
            </Magnetic>
          </div>

          <div>
            <h4>BUSINESS DETAILS</h4>
            <p>Ahmad Ali A.</p>
            <p>Location: Indonesia</p>
          </div>

          <div>
            <h4>SOCIALS</h4>
            <Magnetic>
              <p>
                <a
                  href="https://simt.kemdikbud.go.id/resume?id=_ODCXCa622HvF09fG9eGTg&name=ahmad-ali-addakhil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Awwwards
                </a>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <a
                  href="https://www.instagram.com/ali.addh_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
            </Magnetic>
            <Magnetic>
              <p>
                <a
                  href="https://www.linkedin.com/in/ahmadaliaddakhil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </p>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div>
          <span>
            <h3>Version</h3>
            <p>2025 © Edition</p>
          </span>
          <span>
            <h3>Local Time</h3>
            <p>{currentTime}</p>
          </span>
        </div>
        <div>
          <span>
            <h3>Socials</h3>
            <Magnetic>
              <p>
                <a
                  href="https://simt.kemdikbud.go.id/resume?id=_ODCXCa622HvF09fG9eGTg&name=ahmad-ali-addakhil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Awwwards
                </a>
              </p>
            </Magnetic>
          </span>
          <Magnetic>
            <p>
              <a
                href="https://www.instagram.com/ali.addh_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
          </Magnetic>
          <Magnetic>
            <p>
              <a
                href="https://www.linkedin.com/in/ahmadaliaddakhil"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
