import type { Project } from '@/types';
import { projects as defaultProjects, studios } from '@/data/content';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface CreditsProps {
  projectsList?: Project[];
}

export function Credits({ projectsList = defaultProjects }: CreditsProps) {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'UPCOMING':
        return <AlertCircle size={14} className="text-orange-500" />;
      case 'IN PROGRESS':
        return <Clock size={14} className="text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle size={14} className="text-green-500" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'IN PROGRESS':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <section id="credits" className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-2">
            Credits
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            & Experience
          </h2>
          <p className="mt-4 text-foreground/70">
            Projects I've had the pleasure to work on
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-coral/10 card-hover"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
              </div>

              {/* Project Info */}
              <h3 className="font-bold text-foreground text-lg mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {project.studio}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium text-coral">{project.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studios Section */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Communities & Teams I've Worked With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {studios.map((studio, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-medium"
              >
                {studio}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
