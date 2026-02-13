import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Project } from '@/types';

interface ProjectsTabProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

const statusOptions = [
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'IN PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

export function ProjectsTab({ projects, onProjectsChange }: ProjectsTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    studio: '',
    role: '',
    status: 'UPCOMING' as Project['status'],
  });

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      studio: formData.studio || '-',
      role: formData.role,
      status: formData.status,
    };
    onProjectsChange([...projects, newProject]);
    setFormData({ title: '', studio: '', role: '', status: 'UPCOMING' });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      studio: project.studio,
      role: project.role,
      status: project.status,
    });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    const updatedProjects = projects.map((p) =>
      p.id === editingId
        ? {
            ...p,
            title: formData.title,
            studio: formData.studio || '-',
            role: formData.role,
            status: formData.status,
          }
        : p
    );
    onProjectsChange(updatedProjects);
    setEditingId(null);
    setFormData({ title: '', studio: '', role: '', status: 'UPCOMING' });
  };

  const handleDelete = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id));
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Manage Projects</h2>
          <p className="text-sm text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-coral hover:opacity-90 text-white">
              <Plus size={18} className="mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <Label>Studio</Label>
                <Input
                  value={formData.studio}
                  onChange={(e) =>
                    setFormData({ ...formData, studio: e.target.value })
                  }
                  placeholder="Enter studio name"
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Enter your role"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Project['status']) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAdd}
                disabled={!formData.title || !formData.role}
                className="w-full bg-gradient-coral hover:opacity-90 text-white"
              >
                Add Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-coral/10"
          >
            {editingId === project.id ? (
              <div className="space-y-3">
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  className="text-sm"
                />
                <Input
                  value={formData.studio}
                  onChange={(e) =>
                    setFormData({ ...formData, studio: e.target.value })
                  }
                  placeholder="Studio"
                  className="text-sm"
                />
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Role"
                  className="text-sm"
                />
                <Select
                  value={formData.status}
                  onValueChange={(value: Project['status']) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <Check size={14} className="mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                    className="flex-1"
                  >
                    <X size={14} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-1.5 rounded-lg hover:bg-coral/10 text-muted-foreground hover:text-coral transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {project.studio}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Role:</span>{' '}
                  <span className="font-medium text-coral">{project.role}</span>
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-coral/30">
          <p className="text-muted-foreground">No projects yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first project to get started
          </p>
        </div>
      )}
    </div>
  );
}
