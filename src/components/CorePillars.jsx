import { useAdmin } from '../context/AdminContext';
import TeamSection from './TeamSection';

export default function CorePillars() {
  const { data } = useAdmin();
  return (
    <TeamSection
      members={data.pillars || []}
      eyebrow="Leadership"
      accentClass="bg-neon-cyan"
      headingLine1="The Core Pillars"
      headingLine2="Behind InEra"
      description="Meet the visionaries and leaders driving innovation, execution, and the future of intelligent technology at INERA SOFTWARE PRIVATE LIMITED."
    />
  );
}
