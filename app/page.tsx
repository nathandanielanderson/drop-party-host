import UnityWebGL from '@/components/UnityWebGL';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Drop Party</h1>
        <div
          className="aspect-video w-full"
          style={{
            // Ensure proper sizing and prevent layout shifts
            minHeight: '600px',
            maxHeight: '80vh',
          }}
        >
          <UnityWebGL
            loaderUrl="/unity/Build/unity.loader.js"
            dataUrl="/unity/Build/unity.data"
            frameworkUrl="/unity/Build/unity.framework.js"
            codeUrl="/unity/Build/unity.wasm"
          />
        </div>
      </div>
    </main>
  );
}
