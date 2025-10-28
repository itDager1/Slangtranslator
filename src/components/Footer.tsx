import { BackendStatus } from './BackendStatus';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-gray-600 text-sm">
            SlangTranslator — переводчик для понимания русского интернет-сленга
          </p>
          <BackendStatus />
        </div>
      </div>
    </footer>
  );
}
