import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../../Components/Base/Base';
import { Section, Button, Card, Tag } from '../../Components/UI';
import { useLanguage } from '../../context/LanguageContext';
import './HomePage.css';

const TECH_CORE = ['Node.js', 'React', 'JavaScript'];
const TECH_ADDITIONAL = ['C#', 'Python', 'SQL'];
const TRAIT_KEYS = ['curious', 'analytical', 'responsible', 'methodical', 'professional', 'selfDriven'];
const TIMELINE_LENGTH = 5;

function HomePage() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const basePath = process.env.PUBLIC_URL || '';
  const photoSrc = `${basePath}/joseSantosBusto.jpeg`;

  return (
    <Base>
      <div className={`home-page ${visible ? 'home-page--visible' : ''}`}>
        {/* 1. HERO */}
        <header className="home-hero" ref={heroRef}>
          <div className="home-hero__bg" aria-hidden="true" />
          <div className="dj-container home-hero__inner">
            <div className="home-hero__content">
              <div className="home-hero__photo-wrap">
                <img
                  src={photoSrc}
                  alt="Jose Miguel Santos Palomera"
                  className="home-hero__photo"
                  width={200}
                  height={200}
                />
              </div>
              <h1 className="home-hero__name">Jose Miguel Santos Palomera</h1>
              <p className="home-hero__title">{t('home.heroTitle')}</p>
              <p className="home-hero__desc">{t('home.heroDesc')}</p>
              <p className="home-hero__tagline">{t('home.heroTagline')}</p>
              <div className="home-hero__cta">
                <Button to="/#projects" variant="primary" size="large">
                  {t('home.ctaViewProjects')}
                </Button>
                <Button to="/contact" variant="secondary" size="large">
                  {t('home.ctaContactMe')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* 2. ABOUT ME */}
        <Section id="about" title={t('home.aboutTitle')} subtitle={t('home.aboutSubtitle')} narrow>
          <div className="home-about__text">
            <p>{t('home.aboutP1')}</p>
            <p>{t('home.aboutP2')}</p>
          </div>
        </Section>

        {/* 3. PROFESSIONAL GOALS */}
        <Section id="goals" title={t('home.goalsTitle')} subtitle={t('home.goalsSubtitle')}>
          <ul className="home-goals__list">
            <li>{t('home.goalsL1')}</li>
            <li>{t('home.goalsL2')}</li>
            <li>{t('home.goalsL3')}</li>
            <li>{t('home.goalsL4')}</li>
            <li>{t('home.goalsL5')}</li>
          </ul>
        </Section>

        {/* 4. TECH STACK */}
        <Section id="tech" title={t('home.techTitle')} subtitle={t('home.techSubtitle')}>
          <p className="home-tech__focus">{t('home.techFocus')}</p>
          <div className="home-tech__grid">
            <Card title={t('home.techCoreTitle')} hoverable>
              <ul>
                {TECH_CORE.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </Card>
            <Card title={t('home.techAdditionalTitle')} hoverable>
              <ul>
                {TECH_ADDITIONAL.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* 5. TRAITS */}
        <Section id="traits" title={t('home.traitsTitle')} subtitle={t('home.traitsSubtitle')}>
          <div className="home-traits__wrap">
            {TRAIT_KEYS.map((key) => (
              <Tag key={key}>{t(`home.trait${key.charAt(0).toUpperCase() + key.slice(1)}`)}</Tag>
            ))}
          </div>
        </Section>

        {/* 6. TIMELINE */}
        <Section id="timeline" title={t('home.timelineTitle')} subtitle={t('home.timelineSubtitle')}>
          <div className="home-timeline">
            {Array.from({ length: TIMELINE_LENGTH }, (_, i) => (
              <div key={i} className="home-timeline__item">
                <div className="home-timeline__dot" />
                <div className="home-timeline__content">
                  <span className="home-timeline__year">{t(`home.timeline${i}Year`)}</span>
                  <h3 className="home-timeline__label">{t(`home.timeline${i}Label`)}</h3>
                  <p className="home-timeline__desc">{t(`home.timeline${i}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects anchor for CTA */}
        <Section id="projects" title={t('home.projectsTitle')} subtitle={t('home.projectsSubtitle')}>
          <div className="home-projects__links">
            <Link to="/gestorcrypto" className="home-projects__card">
              <span className="home-projects__name">{t('home.projectGestorName')}</span>
              <span className="home-projects__desc">{t('home.projectGestorDesc')}</span>
            </Link>
            <Link to="/chatylife" className="home-projects__card">
              <span className="home-projects__name">{t('home.projectChatyName')}</span>
              <span className="home-projects__desc">{t('home.projectChatyDesc')}</span>
            </Link>
            <Link to="/pocketmind" className="home-projects__card">
              <span className="home-projects__name">{t('home.projectPocketName')}</span>
              <span className="home-projects__desc">{t('home.projectPocketDesc')}</span>
            </Link>
          </div>
        </Section>

        {/* 7. CTA */}
        <Section id="cta" className="home-cta-section">
          <div className="home-cta">
            <h2 className="home-cta__title">{t('home.ctaTitle')}</h2>
            <p className="home-cta__text">{t('home.ctaText')}</p>
            <div className="home-cta__actions">
              <Button to="/#projects" variant="primary" size="large">
                {t('home.ctaViewProjects')}
              </Button>
              <Link to="/gestorcrypto" className="dj-btn dj-btn--secondary dj-btn--large">
                {t('nav.gestorCrypto')}
              </Link>
              <Link to="/chatylife" className="dj-btn dj-btn--secondary dj-btn--large">
                {t('nav.chatyLife')}
              </Link>
              <Link to="/pocketmind" className="dj-btn dj-btn--secondary dj-btn--large">
                {t('nav.pocketMind')}
              </Link>
              <Button to="/contact" variant="secondary" size="large">
                {t('home.ctaContactMe')}
              </Button>
            </div>
            <div className="home-cta__social">
              <a href="https://github.com/JSantosSP" target="_blank" rel="noopener noreferrer" className="home-cta__link">
                GitHub
              </a>
              <a href="https://linkedin.com/in/jose-santos-palomera" target="_blank" rel="noopener noreferrer" className="home-cta__link">
                LinkedIn
              </a>
            </div>
          </div>
        </Section>
      </div>
    </Base>
  );
}

export default HomePage;
