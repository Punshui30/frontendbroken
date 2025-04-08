import { motion } from 'framer-motion';
import { CopilotMessage } from '../types';
import { cn } from '../lib/utils';

interface Props {
  message: CopilotMessage;
}

export function CopilotMessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className={cn(
        'max-w-[90%] px-4 py-3 rounded-xl shadow-sm mb-3 whitespace-pre-wrap text-sm',
        isUser
          ? 'self-end bg-primary text-primary-foreground rounded-br-none'
          : 'self-start bg-muted text-muted-foreground rounded-bl-none'
      )}
    >
      {message.content}
    </motion.div>
  );
}
