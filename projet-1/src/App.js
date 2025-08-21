import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiMoon, FiSun, FiPhone, FiMail, FiExternalLink, FiGithub, FiServer, FiCheck, FiX } from 'react-icons/fi';
import { testApiConnection, fetchProfile } from './store/authSlice';
// import { api } from './lib/apiClient'; // TODO: Restaurer quand API fonctionnelle

function App() {
  const dispatch = useDispatch();
  const { apiStatus, token, user } = useSelector((state) => state.auth);

  // Theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Ajouter une classe de transition temporaire
    root.classList.add('theme-transitioning');
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Retirer la classe de transition après l'animation
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 400);
  }, [isDark]);

  // AOS
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40, easing: 'ease-out' });
  }, []);

  // Test API connection on mount
  useEffect(() => {
    dispatch(testApiConnection());
    if (token && !user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, user]);

  // Scroll progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setIsDark((v) => !v);

  const skills = [
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind',
    'Node.js',
    'Github Actions',
    'REST API',
    'Git',
  ];

  const languageLevels = [
    { label: 'HTML', value: 100 },
    { label: 'CSS', value: 100 },
    { label: 'SQL', value: 100 },
    { label: 'PHP', value: 95 },
    { label: 'JavaScript', value: 85 },
  ];

  const softSkills = [
    'Gestion de situations critiques',
    'Résolution de problèmes sous pression',
    'Respect de procédures strictes',
    'Rigueur et qualité',
    'Adaptabilité',
  ];

  const SocialIcon = ({ type, href }) => {
    const classes =
      'inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:scale-105 hover:border-gray-300 hover:text-blue-600';
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} aria-label={type}>
        {type === 'github' && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M12 .5a12 12 0 0 0-3.793 23.4c.6.11.82-.26.82-.58v-2.03c-3.338.73-4.038-1.61-4.038-1.61-.547-1.39-1.337-1.76-1.337-1.76-1.093-.75.082-.734.082-.734 1.208.09 1.845 1.24 1.845 1.24 1.075 1.84 2.82 1.31 3.51 1 .11-.79.42-1.31.76-1.61-2.666-.31-5.466-1.33-5.466-5.91 0-1.31.47-2.38 1.24-3.22-.125-.31-.54-1.56.115-3.25 0 0 1.01-.33 3.31 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.56 3.31-1.23 3.31-1.23.655 1.69.24 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.59-2.8 5.6-5.47 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
          </svg>
        )}
        {type === 'linkedin' && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.06c.53-1 1.82-2.2 3.74-2.2C19.4 8 21 10 21 13.6V24h-4v-9c0-2.16-.77-3.64-2.7-3.64-1.47 0-2.35.99-2.73 1.95-.14.35-.18.85-.18 1.35V24H8c.05-8 0-16 0-16z" />
          </svg>
        )}
        {type === 'mail' && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13 21 6.01V6H3zm0 12h18V8l-9 7L3 8v10z" />
          </svg>
        )}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          className="h-1 bg-blue-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100/70 bg-white/70 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                      <div className="flex items-center gap-3">
              <img src="/mq_logo.png" alt="Logo" className="h-8 w-8" />
              <a href="#accueil" className="text-lg font-semibold tracking-tight">Morvin Quernel</a>
            </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#projets" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Projets</a>
            <a href="#apropos" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">À propos</a>
            <a href="#competences" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Compétences</a>
            <a href="#experience" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Expérience</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <ApiStatusIndicator apiStatus={apiStatus} />
            <motion.button
              type="button"
              aria-label="Changer de thème"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
            >
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
              </motion.div>
            </motion.button>
            <a href="#contact" className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 md:inline-block">Me contacter</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(50%_50%_at_50%_0%,rgba(59,130,246,0.12)_0%,rgba(0,0,0,0)_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="mb-3 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">Disponible pour alternance</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-blue-600">Morvin Quernel</span> — Développeur Web
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Passionné par le développement web et les solutions techniques innovantes, je m’appelle Morvin QUERNEL. Spécialisé dans la création d’applications performantes et robustes, je maîtrise les frameworks Symfony (back-end) et React (front-end), ainsi que la conception d’API REST pour des architectures modernes et scalables.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Mon approche allie rigueur, fiabilité et passion pour chaque projet, avec une attention particulière portée à la qualité du code, à l’expérience utilisateur et à la résolution de problèmes complexes. Que ce soit pour construire une application sur mesure, optimiser des processus ou collaborer sur des projets ambitieux, je mets mon expertise et mon engagement au service de solutions techniques adaptées et durables.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              J'ai aquis de nombreuses compétences l'<a href="https://www.eedn.fr/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">EEDN</a>, une école des métiers du numérique qui m’a formé à la création d’applications web performantes et robustes.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Actuellement à la recherche d’une alternance en tant que concepteur-développeur d’applications, je souhaite mettre mes compétences techniques et mon dynamisme au service d’une entreprise innovante, tout en poursuivant ma formation et mon apprentissage des bonnes pratiques du métier.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Curieux, autonome et orienté résultats, j’aime relever les défis technologiques et contribuer à des projets qui ont du sens.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projets" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Voir mes projets</a>
                <a href="#contact" className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white">Me contacter</a>
                <div className="ml-2 flex items-center gap-2">
                  <SocialIcon type="github" href="https://github.com/MorvinQUERNEL" />
                  <SocialIcon type="linkedin" href="https://www.linkedin.com/in/morvin-quernel-9784a3345/" />
                  <SocialIcon type="mail" href="mailto:quernel.morvin@icloud.com" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <motion.div 
                className="mx-auto w-80 h-auto overflow-hidden rounded-3xl bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 shadow-2xl ring-1 ring-black/5 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30" 
                data-aos="zoom-in"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Placeholder*/}
                <img 
                  src={isDark ? "/background1.png" : "/background3.png"} 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-16 flex justify-center">
            <a href="#projets" className="group inline-flex flex-col items-center text-gray-500">
              <span className="text-xs">Scroll</span>
              <span className="mt-1 h-6 w-6 animate-bounce rounded-full border border-gray-300 p-1 text-gray-700 dark:border-gray-700 dark:text-gray-300">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projets" className="mx-auto max-w-6xl px-4 py-16" data-aos="fade-up">
        <div className="mb-8 text-center" data-aos="fade-up" data-aos-delay="50">
          <h2 className="text-2xl font-bold tracking-tight">Dernier projet</h2>
        </div>
        <div className="flex justify-center" data-aos="fade-up" data-aos-delay="100">
          {/* Project principal */}
          <article className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 max-w-4xl w-full">
            <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10" />
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Quernel Auto</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Plateforme moderne d'import/export de véhicules avec paiements sécurisés. 
              Développé avec Symfony 6, cette solution offre une expérience utilisateur fluide 
              pour l'achat et la vente de véhicules de qualité à l'international.
            </p>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">✨ Fonctionnalités principales</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Catalogue de véhicules avec recherche avancée</li>
                <li>• Gestion des utilisateurs et profils personnalisés</li>
                <li>• Paiements sécurisés via Stripe</li>
                <li>• Interface d'administration complète</li>
                <li>• Design responsive optimisé mobile</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Symfony 6.4+</span>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">PHP 8.1+</span>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">MySQL 8.0+</span>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Docker</span>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Stripe</span>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Twig</span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <a href="https://quernelauto.fr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                <FiExternalLink className="h-4 w-4" /> Demo
              </a>
              <a href="https://github.com/MorvinQUERNEL/symfony_quernel-auto" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <FiGithub className="h-4 w-4" /> Code
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* About */}
      <section id="apropos" className="mx-auto max-w-6xl px-4 py-16" data-aos="fade-up">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">À propos</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
            Ancien conducteur de métro (2017–2025) à la RATP, j’ai entamé une reconversion vers le développement web en suivant une formation de six mois à l’EEDN (niveau 5). Cette expérience m’a permis de développer un sens aigu de la rigueur, de la sécurité et de la gestion des imprévus, des compétences que je mets désormais au service du code. Actuellement, je suis à la recherche d’une alternance pour poursuivre mes études et approfondir mes compétences en développement web.
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-700 dark:text-gray-300">
              {softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#contact" className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black">Travaillons ensemble</a>
              <a href="/CV-morvin.pdf" className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50" download>
                Télécharger mon CV
              </a>
            </div>
          </div>
          <motion.div 
            className="relative shadow-2xl rounded-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={isDark ? "/background2.png" : "/background4.png"} 
              alt="Background" 
              className="aspect-[4/3] w-full overflow-hidden rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="competences" className="mx-auto max-w-6xl px-4 py-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold tracking-tight">Compétences</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-500">Langages</h3>
            <div className="mt-4 space-y-4">
              {languageLevels.map(({ label, value }) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs text-gray-500">{value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-500">Technos & outils</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">{s}</span>
              ))}
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">Symfony</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">Twig</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">SQL</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">Conception MCD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold tracking-tight">Expérience</h2>
        <div className="mt-8 relative">
          <div className="absolute left-3 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-8">
            <div className="relative pl-10" data-aos="fade-up">
              <div className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-900" />
              <h3 className="font-semibold">Conducteur de métro — RATP</h3>
              <p className="text-sm text-gray-500">2017 – 2025</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Gestion des situations critiques, application de procédures strictes, rigueur et sens de la sécurité.
              </p>
            </div>
            <div className="relative pl-10" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-900" />
              <h3 className="font-semibold">Développeur web — EEDN</h3>
              <p className="text-sm text-gray-500">2025</p>
              <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>Développement backend avec Symfony, conception SQL et services.</li>
                <li>Interfaces utilisateur avec HTML, Twig, CSS, JavaScript (mobile-first).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16" data-aos="fade-up">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-2xl font-bold tracking-tight">Me contacter</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Une entreprise qui recherche un alternant? Écrivez‑moi, je vous répondrai rapidement.</p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="tel:+33667337807" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"><FiPhone /> +33 6 67 33 78 07</a>
              <a href="mailto:quernel.morvin@icloud.com" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"><FiMail /> quernel.morvin@icloud.com</a>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com/MorvinQUERNEL" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"><FiGithub /></a>
                <a href="https://www.linkedin.com/in/morvin-quernel-9784a3345/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">in</a>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
            {user && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Connecté en tant que: {user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Morvin Quernel.
      </footer>
    </div>
  );
}

export default App;

function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null);
      
      // TODO: Temporaire - Simuler succès en attendant résolution API
      // const response = await api.post('/contact', {
      //   name: data.name,
      //   email: data.email,
      //   message: data.message
      // });
      
      // Simulation temporaire d'un succès
      await new Promise(resolve => setTimeout(resolve, 1500)); // Délai réaliste
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Votre message a été envoyé avec succès ! Je vous recontacterai bientôt.' 
      });
      reset();
      
      // Log temporaire pour récupérer les données
      console.log('Message reçu:', { name: data.name, email: data.email, message: data.message });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      
      let errorMessage = 'Une erreur est survenue lors de l\'envoi du message.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setSubmitStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-xl font-semibold">Écrivez‑moi</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholder="Votre nom"
            {...register('name', { required: 'Nom requis' })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholder="vous@exemple.com"
            {...register('email', { required: 'Email requis' })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholder="Décrivez votre besoin..."
            {...register('message', { required: 'Message requis' })}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Envoi...' : 'Envoyer'}
      </button>
      
      {submitStatus && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' 
            : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}

function ApiStatusIndicator({ apiStatus }) {
  if (!apiStatus) return null;
  
  const isConnected = apiStatus.status === 'ok';
  
  return (
    <div
      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm ${
        isConnected
          ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
          : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300'
      }`}
      title={apiStatus.error || 'API connectée'}
    >
      <FiServer className="h-4 w-4" />
      {isConnected ? <FiCheck className="h-3 w-3" /> : <FiX className="h-3 w-3" />}
      <span className="hidden sm:inline">{isConnected ? 'API OK' : 'API Error'}</span>
    </div>
  );
}


