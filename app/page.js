// app/page.js
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsSection from '../components/sections/SkillsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import DashboardSection from '../components/sections/DashboardSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <DashboardSection />
      <ContactSection />
      <Footer />
    </>
  )
}
