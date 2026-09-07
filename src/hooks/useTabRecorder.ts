import { useCallback, useEffect, useRef, useState } from 'react';

const PREFERRED_MIME_TYPES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp9',
  'video/webm;codecs=h264',
  'video/webm',
];

function pickMimeType() {
  for (const type of PREFERRED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
}

function downloadBlob(blob: Blob, extension: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = url;
  a.download = `recording-${timestamp}.${extension}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function useTabRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
  }, []);

  const start = useCallback(async () => {
    if (recorderRef.current) return;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      // Chromium-only hint: pre-selects "This Tab" and skips the tab picker.
      // Falls back to the normal share-picker UI on browsers that ignore it.
      preferCurrentTab: true,
      video: {
        frameRate: 60,
        displaySurface: 'browser',
      },
      audio: false,
    } as DisplayMediaStreamOptions);

    streamRef.current = stream;

    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(stream, {
      mimeType: mimeType || undefined,
      videoBitsPerSecond: 50_000_000,
    });

    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType || 'video/webm' });
      downloadBlob(blob, 'webm');
      chunksRef.current = [];
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      recorderRef.current = null;
      setIsRecording(false);
    };

    // If the user stops sharing via the browser's native "Stop sharing" control.
    stream.getVideoTracks()[0]?.addEventListener('ended', () => {
      recorder.stop();
    });

    recorder.start();
    recorderRef.current = recorder;
    setIsRecording(true);
  }, []);

  const toggle = useCallback(() => {
    if (recorderRef.current) {
      stop();
    } else {
      start().catch((err) => {
        if ((err as Error)?.name !== 'NotAllowedError') {
          console.error('Recording failed to start:', err);
        }
      });
    }
  }, [start, stop]);

  useEffect(() => {
    return () => {
      recorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return { isRecording, toggle };
}
