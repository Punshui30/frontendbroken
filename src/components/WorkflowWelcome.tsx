import { motion } from 'framer-motion';
import { Wand2, Workflow } from 'lucide-react';

export default function WorkflowWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground"
    >
      <Workflow className="h-10 w-10 text-primary mb-2" />
      <h2 className="text-lg font-semibold text-foreground mb-1">Welcome to Flow Editor</h2>
      <p className="text-sm max-w-md">
        This is where D.A.N. will visualize your automations. You can start building manually, or ask the assistant to generate a workflow based on your prompt.
      </p>

      <div className="mt-4 text-xs text-muted-foreground italic flex items-center gap-1">
        <Wand2 className="w-3 h-3" />
        Tip: Try saying “When someone submits a Typeform, create a row in Airtable and send a Slack message.”
      </div>
    </motion.div>
  );
}
