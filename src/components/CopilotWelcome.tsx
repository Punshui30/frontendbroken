import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function CopilotWelcome({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 space-y-6 text-muted-foreground">
      <Sparkles className="w-8 h-8 text-primary" />
      <div>
        <h2 className="text-lg font-semibold text-foreground">Welcome to D.A.N.</h2>
        <p className="text-sm max-w-md mx-auto mt-1">
          D.A.N. is your AI Copilot — ready to build workflows, suggest tools, and help orchestrate your system in real-time.
        </p>
      </div>
      {onGenerate && (
        <Button variant="default" size="sm" className="gap-1" onClick={onGenerate}>
          <ArrowRight className="w-4 h-4" />
          Generate Workflow
        </Button>
      )}
    </div>
  );
}
