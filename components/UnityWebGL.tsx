'use client';

import React, { useEffect, useRef } from 'react';

interface UnityWebGLProps {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
}

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
  devicePixelRatio: number;
  matchWebGLToCanvasSize: boolean;
  tabindex: number;
}

interface UnityInstance {
  Quit: () => void;
}

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: UnityConfig
    ) => Promise<UnityInstance>;
  }
}

export default function UnityWebGL({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
}: UnityWebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUnity = async () => {
      if (typeof window !== 'undefined' && canvasRef.current) {
        try {
          // Remove any existing Unity loader scripts
          const existingScript = document.querySelector(
            'script[src="' + loaderUrl + '"]'
          );
          if (existingScript) {
            document.body.removeChild(existingScript);
          }

          const script = document.createElement('script');
          script.src = loaderUrl;
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });

          if (window.createUnityInstance) {
            const unityInstance = await window.createUnityInstance(
              canvasRef.current,
              {
                dataUrl: dataUrl,
                frameworkUrl: frameworkUrl,
                codeUrl: codeUrl,
                streamingAssetsUrl: 'StreamingAssets',
                companyName: 'Your Company',
                productName: 'Your Product',
                productVersion: '1.0',
                devicePixelRatio: window.devicePixelRatio,
                matchWebGLToCanvasSize: true,
                tabindex: 1,
              }
            );

            // Ensure the canvas can receive focus for keyboard events
            if (canvasRef.current) {
              canvasRef.current.tabIndex = 1;
              canvasRef.current.focus();
            }

            // Cleanup function
            return () => {
              if (unityInstance) {
                unityInstance.Quit();
              }
            };
          }
        } catch (error) {
          console.error('Failed to load Unity:', error);
        }
      }
    };

    loadUnity();
  }, [loaderUrl, dataUrl, frameworkUrl, codeUrl]);

  // Handle focus when clicking the container
  const handleContainerClick = () => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black rounded-lg overflow-hidden"
      onClick={handleContainerClick}
    >
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        className="w-full h-full"
        tabIndex={1}
      />
    </div>
  );
}
