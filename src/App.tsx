import { useEffect } from 'react';
import AssistantVideoPage from './pages/AssistantVideoPage';
import { useTabRecorder } from './hooks/useTabRecorder';

export default function App() {
  const { isRecording, toggle } = useTabRecorder();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    document.title = isRecording ? '● Recording — Assistant' : 'Assistant';
  }, [isRecording]);

  return <AssistantVideoPage />;
}
