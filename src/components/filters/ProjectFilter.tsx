import { Folder } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "../../store/useStore";

interface ProjectFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const ProjectFilter = ({ value, onChange }: ProjectFilterProps) => {
  const store = useStore();
  
  // Get only projects that have uncompleted tasks assigned and count their tasks
  const projectsWithTasks = store.projects
    .map(project => ({
      ...project,
      taskCount: store.tasks.filter(task => 
        task.projectId === project.id && !task.completed
      ).length
    }))
    .filter(project => project.taskCount > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Select 
      value={value || "none"} 
      onValueChange={(value) => onChange(value === "none" ? null : value)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger className="w-8 h-8 p-0">
              <Folder className="h-4 w-4" />
            </SelectTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Project</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SelectContent>
        <SelectItem value="none">All Projects</SelectItem>
        {projectsWithTasks.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: project.taskCount === 1 ? '#4ade80' : '#ea384c'
                }}
              />
              {project.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};