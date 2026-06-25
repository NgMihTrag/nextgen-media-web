import { getPublicPortfolioProjects } from "@/app/actions/portfolio"
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section"

export async function ServicesFeaturedProjectsServer() {
  const projects = await getPublicPortfolioProjects()
  return <FeaturedProjectsSection projects={projects} />
}
