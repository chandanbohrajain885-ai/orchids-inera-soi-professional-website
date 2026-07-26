import { useAdmin } from '../context/AdminContext';
import TeamSection from './TeamSection';

export default function SOIFoundingTeam() {
  const { data } = useAdmin();
  return (
    <TeamSection
      members={data.soiPillars || []}
      eyebrow="SOI Leadership"
      accentClass="bg-yellow-500"
      headingLine1="The Founding Team of"
      headingLine2="School of Intelligence"
      description="Meet the founding team behind SOI — School of Intelligence — building an execution-first, AI-driven learning ecosystem for the next generation of students."
    />
  );
}
